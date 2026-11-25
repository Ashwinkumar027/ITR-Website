// Utility function to handle Save & Exit across all sections
export const handleSaveAndExit = () => {
    // Save form data to localStorage before exiting (optional)
    const shouldSave = window.confirm('Your progress will be saved. Return to main website?');

    if (shouldSave) {
        // Redirect to main website home page
        window.location.href = '/';
    }
};
