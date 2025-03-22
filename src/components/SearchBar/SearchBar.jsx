import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <header>
      <Toaster />
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          const value = values.topic;
          if (value === "") {
            toast.error("Input must be fullfield");
            return;
          }
          onSubmit(value);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
