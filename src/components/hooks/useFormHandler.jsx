import { useCallback, useState } from "react";

const useFormHandler = initialState => {
  const [values, setValues] = useState(initialState);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
  }, []);

  return {
    handleChange,
    values
  };
};

export default useFormHandler;
