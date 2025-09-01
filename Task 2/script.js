// DOM Elements
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const charCount = document.getElementById('charCount');

// Form fields
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Error message elements
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const namePattern = /^[a-zA-Z\s]{2,}$/;

// Character limits
const MAX_MESSAGE_LENGTH = 500;
const MIN_MESSAGE_LENGTH = 10;
const MIN_NAME_LENGTH = 2;
const MIN_SUBJECT_LENGTH = 3;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCharacterCount();
});

function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    fullNameInput.addEventListener('input', () => validateField('fullName'));
    fullNameInput.addEventListener('blur', () => validateField('fullName'));
    
    emailInput.addEventListener('input', () => validateField('email'));
    emailInput.addEventListener('blur', () => validateField('email'));
    
    subjectInput.addEventListener('input', () => validateField('subject'));
    subjectInput.addEventListener('blur', () => validateField('subject'));
    
    messageInput.addEventListener('input', () => {
        validateField('message');
        updateCharacterCount();
    });
    messageInput.addEventListener('blur', () => validateField('message'));
    
    // Format inputs
    fullNameInput.addEventListener('input', formatName);
    emailInput.addEventListener('input', formatEmail);
}

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    const value = field.value.trim();
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (!value) {
        isValid = false;
        errorMessage = `${getFieldDisplayName(fieldName)} is required.`;
    } else {
        // Field-specific validation
        switch (fieldName) {
            case 'fullName':
                if (value.length < MIN_NAME_LENGTH) {
                    isValid = false;
                    errorMessage = `Name must be at least ${MIN_NAME_LENGTH} characters long.`;
                } else if (!namePattern.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name (letters and spaces only).';
                } else if (!value.includes(' ')) {
                    isValid = false;
                    errorMessage = 'Please enter your full name (first and last name).';
                }
                break;
                
            case 'email':
                if (!emailPattern.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
                
            case 'subject':
                if (value.length < MIN_SUBJECT_LENGTH) {
                    isValid = false;
                    errorMessage = `Subject must be at least ${MIN_SUBJECT_LENGTH} characters long.`;
                }
                break;
                
            case 'message':
                if (value.length < MIN_MESSAGE_LENGTH) {
                    isValid = false;
                    errorMessage = `Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`;
                } else if (value.length > MAX_MESSAGE_LENGTH) {
                    isValid = false;
                    errorMessage = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
                }
                break;
        }
    }
    
    // Update field appearance and error message
    updateFieldValidation(field, errorElement, isValid, errorMessage);
    
    return isValid;
}

function updateFieldValidation(field, errorElement, isValid, errorMessage) {
    // Remove existing classes
    field.classList.remove('valid', 'invalid');
    
    if (field.value.trim()) {
        if (isValid) {
            field.classList.add('valid');
        } else {
            field.classList.add('invalid');
        }
    }
    
    // Update error message
    if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function getFieldDisplayName(fieldName) {
    const displayNames = {
        'fullName': 'Full Name',
        'email': 'Email Address',
        'subject': 'Subject',
        'message': 'Message'
    };
    return displayNames[fieldName] || fieldName;
}

function formatName(event) {
    // Capitalize first letter of each word
    const value = event.target.value;
    const formatted = value.replace(/\b\w/g, l => l.toUpperCase());
    if (formatted !== value) {
        event.target.value = formatted;
    }
}

function formatEmail(event) {
    // Convert to lowercase
    const value = event.target.value;
    const formatted = value.toLowerCase();
    if (formatted !== value) {
        event.target.value = formatted;
    }
}

function updateCharacterCount() {
    const currentLength = messageInput.value.length;
    charCount.textContent = currentLength;
    
    const countElement = charCount.parentElement;
    countElement.classList.remove('warning', 'danger');
    
    if (currentLength > MAX_MESSAGE_LENGTH * 0.8) {
        countElement.classList.add('warning');
    }
    if (currentLength > MAX_MESSAGE_LENGTH * 0.95) {
        countElement.classList.add('danger');
    }
}

function validateForm() {
    const fields = ['fullName', 'email', 'subject', 'message'];
    let isFormValid = true;
    
    fields.forEach(fieldName => {
        const isFieldValid = validateField(fieldName);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

async function handleSubmit(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        // Focus on first invalid field
        const firstInvalidField = form.querySelector('.invalid');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate form submission
        await simulateFormSubmission();
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after delay
        setTimeout(() => {
            resetForm();
        }, 3000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

function setLoadingState(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
        submitBtn.classList.add('loading');
    } else {
        submitBtn.classList.remove('loading');
    }
}

async function simulateFormSubmission() {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

function showSuccessMessage() {
    form.style.display = 'none';
    successMessage.classList.add('show');
}

function resetForm() {
    // Reset form
    form.reset();
    
    // Clear validation states
    const fields = form.querySelectorAll('.form-input, .form-textarea');
    fields.forEach(field => {
        field.classList.remove('valid', 'invalid');
    });
    
    // Clear error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    // Reset character count
    updateCharacterCount();
    
    // Hide success message and show form
    successMessage.classList.remove('show');
    form.style.display = 'flex';
    
    // Focus on first field
    fullNameInput.focus();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to submit form
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (!submitBtn.disabled) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to reset form (when success message is shown)
    if (event.key === 'Escape' && successMessage.classList.contains('show')) {
        resetForm();
    }
});

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced form validation with custom messages
function getCustomErrorMessage(fieldName, validationType) {
    const messages = {
        fullName: {
            required: 'We need your name to personalize our response.',
            invalid: 'Please enter your real name using letters only.',
            tooShort: 'Your name seems too short. Please enter your full name.'
        },
        email: {
            required: 'We need your email to send you a response.',
            invalid: 'Please check your email format (example: name@domain.com).'
        },
        subject: {
            required: 'Please tell us what this message is about.',
            tooShort: 'Please provide a more descriptive subject.'
        },
        message: {
            required: 'Please tell us more about your inquiry.',
            tooShort: 'Please provide more details in your message.',
            tooLong: 'Your message is too long. Please keep it under 500 characters.'
        }
    };
    
    return messages[fieldName]?.[validationType] || 'Please check this field.';
}

