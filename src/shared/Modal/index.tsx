import React, { useEffect, useRef } from 'react';
import DeleteIcon from '../../assets/delete.svg';
import styles from './index.module.css';
import { TModalProps } from '../../types/types';

export const Modal: React.FC<TModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            modalRef.current?.focus();
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.modal}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
            >
                {children}
                <button
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <img width={30} src={DeleteIcon} alt="Закрыть" />
                </button>
            </div>
        </div>
    );
};
