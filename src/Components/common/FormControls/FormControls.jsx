import React from "react"
import styles from "./FormControls.module.css"
import {TextareaAutosize} from "@mui/material";


const FormControls = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControls {...props}>
        <TextareaAutosize
            {...input} {...restProps}
            maxRows={props.maxRows}
            minRows={props.minRows}
            aria-label="maximum height"
            style={props.style}
        />
    </FormControls>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}