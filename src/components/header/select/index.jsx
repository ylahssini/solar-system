import React, { useRef, useState, useEffect } from 'react';
import './styles.scss';

const Select = ({ placeholder, data = [], isRtl, disabled, handleChange }) => {
    const [localValue, setLocalValue] = useState({ value: '', label: placeholder });
    const [showDropdown, setShowDropdown] = useState(false);
    const select = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.className.includes('select-selected')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    function handleDropDown() {
        setShowDropdown((state) => !state);
    }

    function handleOption(item) {
        setLocalValue((state) => ({ ...state, ...item }));
        setShowDropdown(false);

        if (handleChange) {
            handleChange(item);
        }
    }

    return (
        <div ref={select} className={`custom-select ${disabled ? '__disabled' : ''}`}>
            <select disabled={disabled}>
                <option value="">{placeholder || 'Select'}</option>
                {data.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>

            <button
                type="button"
                className={`select-selected ${isRtl ? '__rtl' : ''} ${showDropdown ? '__active' : ''}`}
                onClick={handleDropDown}
                disabled={disabled}
            >
                {!localValue.value ? placeholder || 'Select' : localValue.label}
            </button>
            <ul className={`select-items ${!showDropdown ? 'select-hide' : ''} ${isRtl ? '__rtl' : ''}`}>
                {localValue.value !== '' ? <li onClick={() => handleOption({ label: placeholder, value: '' })}>{placeholder || 'Select'}</li> : null}
                {data.map((item) => {
                    if (item.value !== localValue.value) {
                        return (
                            <li key={item.value} onClick={() => handleOption(item)}>
                                {item.label}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Select;
