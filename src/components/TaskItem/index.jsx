import React, { useState } from 'react';
import styled from '@emotion/styled';

const Box = styled.div`
    width: 100%;
    background: var(--grey-03);
    padding: 8px 54px 8px 8px;
    position: relative;
    height: 64px;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    .task-item {
        &__input {
            appearance: none;
            border-radius: 0;
            border: none;
            margin: 0;
            padding: 0 15px;
            width: 100%;
            height: 40px;
            outline: none !important;
            
            &[readonly] {
                background: none;
                cursor: pointer;
                border: none;
                outline: none;
                padding: 0 8px;
            }
        }
        &__close-btn {
            appearance: none;
            padding: 0;
            border: none;
            outline: none;
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            height: 24px;
            width: 24px;
            cursor: pointer;
            z-index: 10;
            background-color: var(--grey-04);
            border-radius: 50%;
            color: var(--primary-white);
        }
    }

`;


const TaskItem = ({data, onRemoveTask, onEditTask}) => {
    const [ isReadOnly, setIsReadOnly ] = useState(true);
    let debounceTimeout;

    const removeTask = (event) => {
        event.preventDefault();
        onRemoveTask && onRemoveTask(data?.id);
    }

    const editTask = (event) => {

        // Clean up previous timeout
        clearTimeout(debounceTimeout);

        // Set new timeout
        debounceTimeout = setTimeout(() => {
            onEditTask && onEditTask(data?.id, event.target.value).then(() => {
                setIsReadOnly(true);
            });
        }, 300);

    }

    const activateInput   = () => {
        setIsReadOnly(false);
    };

    return (
        <Box className={'task-item'}>

                <input type="text"
                       readOnly={isReadOnly}
                       defaultValue={data.content}
                       onClick={activateInput}
                       onChange={editTask}
                       className={'task-item__input'}
                />

            {
                !isReadOnly &&
                <button className={'task-item__close-btn'}  onClick={removeTask}
                        type={'button'}>
                    {'X'}
                </button>
            }
        </Box>
    );
};

export default TaskItem;
