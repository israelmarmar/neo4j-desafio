import React from 'react';
import styles from "./styles.module.css";

interface InputFieldProps {
    name: string;
    label?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hidden?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, value, onChange, hidden = false }) => {
    return (
        <div className={!hidden ? styles['input-box'] : ''}>
            {!hidden && <label className={styles['input-label']}>{label}</label>}
            <input
                type={hidden ? "hidden" : "text"}
                name={name}
                className={styles['input-text']}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
