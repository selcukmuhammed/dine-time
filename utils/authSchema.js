import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email zorunlu").email("Geçersiz email"),
  password: Yup.string()
    .required("Şifre zorunlu")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export default validationSchema;
