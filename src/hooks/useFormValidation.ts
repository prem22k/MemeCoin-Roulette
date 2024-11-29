import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

export const useFormValidation = <T extends object>(initialValues: T, rules: ValidationRules) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = useCallback((name: keyof T, value: any) => {
    if (rules[name as string]) {
      const error = rules[name as string](value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
      return !error;
    }
    return true;
  }, [rules]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    validate(name, value);
  }, [validate]);

  return {
    values,
    errors,
    handleChange,
    validate,
  };
}; 