import ModalComponent from "./Modal";
import styles from "./styles.module.css";
import { Form, Link } from "@remix-run/react";
import InputField from "./Input";

interface Trail {
    id: string;
    title: string;
}

interface TrailComponentProps {
    trails?: Trail[];
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TrailComponent({ trails = [], modalIsOpen, setModalIsOpen }: TrailComponentProps) {
    return (
        <>
            <ModalComponent  modalIsOpen={modalIsOpen} closeModal={()=>setModalIsOpen(false)}>
                <Form method="post" className={styles["modal-container"]}>
                    <h3 className={styles["item-title"]}>Adicionar trilha</h3>
                    <InputField name='id' label="Id"/>
                    <InputField name='title' label="Título"/>
                    <br />
                    <div className={styles['reverse-row']}>
                        <button className={styles.button} type="submit">Criar trilha</button>
                        <span className={styles['light-button']} onClick={()=>setModalIsOpen(false)}>Cancelar</span>
                    </div>
                </Form>
            </ModalComponent>
            <div className={styles.container}>
                <div className={styles.row}>
                    <button className={styles.button} onClick={()=>setModalIsOpen(true)}>+ Adicionar trilha</button>
                </div>
                <br />
                {trails.map(t => (
                    <Link className={styles.item} key={t.id} to={`/explore/${t.id}`}>
                        <h3 className={styles["item-title"]}>{t.title}</h3>
                    </Link>
                ))}
            </div>
        </>
    );
}
