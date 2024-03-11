import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import InputText from '../components/formElements/InputText';
import Typography from '../components/uiElements/Typography';
import TaskItem from '../components/TaskItem';
import { useStore } from '../store/StoreContext';
import { useNavigate } from 'react-router-dom';
import { addNewUserTask, deleteItem, editItem } from '../helpers/apiRequests';

const Box = styled.div`
    width: 632px;
    margin: 0 auto 30px;
    padding-top: 80px;
    text-align: center;

    .tasks-box {
        &__form-input {
            .form-element__text-input[readonly] {
                background: none;
                cursor: pointer;
            }
        }

        &__create-new-task {
            position: relative;
            margin-bottom: 30px;
            
            .form-element__text-input {
                margin: 0;
                padding: 15px;
            }
        }

        &__list {
            padding-top: 40px;
        }

        &__no-tasks-message {
            text-align: center;
            color: var(--purple-01);
        }

        &__form-close {
            
        }
    }

`;

const Home = () => {
    const {state, dispatch}         = useStore();
    const navigate   = useNavigate();

    const [ formData, setFormData ] = useState({
                                                   'new-task-name': '',
                                               });

    /**
     * Checks if the user is authenticated; if not, navigates to the signin page.
     * @param {Object} state - The current state containing user information.
     * @param {function} navigate - The function used for navigation.
     * @param {boolean} replace - If true, the current entry in the navigation history will be replaced.
     */
    useEffect(() => {
        if ( !state.user.name ) {
            navigate('/signin/', {replace: true});
        }
    }, []);


    /**
     * Handles the creation of a new task.
     * @param {Object} event - The form submission event.
     */
    const newTaskCreation = async (event) => {
        event.preventDefault();

        const result = await addNewUserTask(
            state.user.id,
            {
                content  : event.target['new-task-name'].value,
                completed: false,
            },
        );

        dispatch({
                     type: 'ADD_NEW_TASK',
                     payload: {
                         id  : result.id,
                         content: result.content,
                     },
                 });

    };


    /**
     * Handles the editing of a task.
     * @param {string} taskID - The ID of the task to be edited.
     * @param {string} newContent - The new content for the task.
     */
    const onEditTask = async (taskID, newContent) => {

        const result = await editItem(state.user.id, taskID, newContent);

        dispatch({
                 type   : 'UPDATE_TASK',
                 payload: {
                     id     : taskID,
                     content: result.content,
                 },
             });

    }


    /**
     * Handles the deletion of a task.
     * @param {string} taskID - The ID of the task to be deleted.
     */
    const onDeleteTask = async (taskID) => {

        const result = await deleteItem(taskID, state.user.id);

        dispatch({
                 type   : 'REMOVE_TASK',
                 payload: {
                     id     : taskID,
                 },
             });

    }

    return (
        <>
            <Header/>
            <Box className="tasks-box">
                <form className="tasks-box__create-new-task"
                      onSubmit={newTaskCreation}>
                    <InputText type={'text'}
                               className={'tasks-box__form-input'}
                               name={'new-task-name'}
                               placeholder={'Type a task and press Enter to add'}
                               setFormData={setFormData}
                               formData={formData}
                    />
                </form>
                <Typography styleType={'h3'} tag={'h3'}
                            className={'tasks-box__caption'}>
                    {'Tasks'}
                </Typography>
                <div className="tasks-box__list">
                    {
                        !state.tasks.length
                        ?
                        <Typography styleType={'text-01'}
                                    tag={'p'}
                                    className={'tasks-box__no-tasks-message'}>
                            {':('}
                            <br/>
                            {'There is no task yet!'}
                        </Typography>
                        :
                        state.tasks.map((item, inx) => {
                            return (
                                <TaskItem data={item}
                                          key={item.content}
                                          onEditTask={onEditTask}
                                          onRemoveTask={onDeleteTask}
                                />
                            );
                        })
                    }
                </div>
            </Box>
        </>
    );
};

export default Home;
