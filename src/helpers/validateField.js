
export const validateFormData = ( formData, errorMessages ) => {
    const results = {};

    for ( const key in formData ) {

        const fieldValue = formData[key];

        if ( !formData.hasOwnProperty( key ) ) {
            results[key] = {
                isValid      : true,
                errorMessage : '',
            };
        }

        // Check required
        // TODO: For real app need to add another validations
        let isValid = fieldValue && fieldValue.trim() !== '';
        let errorMessage = isValid ? '' : errorMessages[key];

        // Generate a check response for each field
        results[key] = {
            isValid,
            errorMessage,
        }
    }

    return results;
}
