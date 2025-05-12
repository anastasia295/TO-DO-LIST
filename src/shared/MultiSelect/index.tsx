import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { TMultiSelectProps } from '../../types/types';

const MultiSelect: React.FC<TMultiSelectProps> = ({
    options,
    value = [],
    onChange,
    placeholder,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions((prev) => [...prev, option]);
        }
    };

    const handleOptionClick = (option: string) => {
        toggleOption(option);
        onChange(
            selectedOptions.includes(option)
                ? selectedOptions.filter((o) => o !== option)
                : [...selectedOptions, option]
        );
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggleDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.multiselect} ref={dropdownRef}>
            <div
                className={styles.input}
                onClick={handleToggleDropdown}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                tabIndex={0}
            >
                {selectedOptions.length > 0
                    ? selectedOptions.join(', ')
                    : placeholder}
            </div>
            {isOpen && (
                <div className={styles.dropdown} role="listbox">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleOptionClick(option.value)}
                            tabIndex={0}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
