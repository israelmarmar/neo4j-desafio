import ModalComponent from "./Modal";
import styles from "./styles.module.css";
import { Form } from "@remix-run/react";
import InputField from "./Input";
import TextArea from "./TextArea";

interface Step {
    id: string;
    title: string;
    content: string;
}

interface StepComponentProps {
    steps?: Step[];
    trailId: string;
    title: string;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepComponent: React.FC<StepComponentProps> = ({ steps = [], trailId, title, modalIsOpen, setModalIsOpen }) => {

    return (
        <>
        <ModalComponent  modalIsOpen={modalIsOpen} closeModal={()=>setModalIsOpen(false)}>
            <Form method="post" className={styles["modal-container"]}>
                <h3 className={styles["item-title"]}>Adicionar passo</h3>
                <InputField name='trail_id' label="TrailId" value={trailId} hidden={true} />
                <InputField name='id' label="Id"/>
                <InputField name='title' label="Título"/>
                <TextArea name='content' label="Conteúdo"/>
                <br />
                <div className={styles['reverse-row']}>
                    <button className={styles.button} type="submit">Criar passo</button>
                    <span className={styles['light-button']} onClick={()=>setModalIsOpen(false)}>Cancelar</span>
                </div>
            </Form>
        </ModalComponent>
        <div className={styles.container}>
            <div className={styles.row}>
                <h3 className={styles["item-title"]}>{title}</h3>
                <button className={styles.button} onClick={()=>setModalIsOpen(true)}>+ Adicionar passo</button>
            </div>
            <br />
            {steps.map(t => (
                <a className={styles.item} key={t.id} href={`#`}>
                    <h3 className={styles["item-title"]}>{t.title}</h3>
                    <p className={styles.content}>{t.content}</p>
                </a>
            ))}
        </div>
        </>
    );
};

export default StepComponent;
