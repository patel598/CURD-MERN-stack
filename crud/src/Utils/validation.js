import * as Yup from "yup";



export const LoginSchema = Yup.object().shape({
    email: Yup.string().trim()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-zA-Z-0-9]+(\.[a-zA-Z]{2,})+))$/, "Invalid email address")
        .email('Please enter valid email').required('Please enter email'),
    password: Yup.string().trim()
        .required('Please enter Password'),
});


const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];


export const SignUpSchema = Yup.object().shape({
    name: Yup.string().trim()
        .max(512, 'The contact name cannot exceed 512 char')
        .min(1, "Minimum 1 character is required")
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Name can only contain alphabet.'
        )
        .required('Please enter name'),
    email: Yup.string().trim()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-zA-Z-0-9]+(\.[a-zA-Z]{2,})+))$/, "Invalid email address")
        .email('Please enter valid email')
        .required('Please enter email'),
    password: Yup.string()
        .matches(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Character"
        )
        .required('Please enter Password'),
    image: Yup.mixed()
        .nullable()
        .required('A image is required')
        .test('format',
            'upload image type .jpg, jpeg, png', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),


});



export const productSchema = Yup.object({
    metaTitle: Yup.string().required('Meta title is required'),
    productName: Yup.string().required('Product name is required'),
    qty: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    discountedPrice: Yup.number()
        .required('Discounted price is required')
        .positive('Discounted price must be a positive number')
        .min(0, 'Discounted price must be 0 or a positive number')
        .max(Yup.ref('price'), 'Discounted price must be less than or equal to the price'),
        description: Yup.string().test('len', 'Must be exactly 50 characters', val => val.length >= 10).required('Description is required'),
    image: Yup.mixed()
        .nullable()
        .required('A image is required')
        .test('format',
            'upload image type .jpg, jpeg, png', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
        .test('Size', 'File size must be greater than 20kb', (value) => value && value?.size > 20480),
    isActive: Yup.boolean(),
});


export const editSchema = Yup.object({
    metaTitle: Yup.string().required('Meta title is required'),
    productName: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    qty: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    discountedPrice: Yup.number()
        .required('Discounted price is required')
        .positive('Discounted price must be a positive number')
        .max(Yup.ref('price'), 'Discounted price must be less than or equal to the price'),
    description: Yup.string().test('len', 'Must be exactly 50 characters', val => val.length >= 10).required('Description is required'),
    image: Yup.string(),
    isActive: Yup.boolean(),
});

