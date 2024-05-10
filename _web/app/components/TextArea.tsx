import React from 'react';
import styles from "./styles.module.css";

interface TextAreaProps {
    name: string;
    label?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, value, onChange }) => {
    return (
        <div className={styles['textarea-box']}>
            <label className={styles['input-label']}>{label}</label>
            <textarea
                name={name}
                className={styles['textarea']}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextArea;
