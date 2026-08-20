import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CustomSelect.css';

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => (typeof opt === 'object' ? opt.value === value : opt === value));
  const displayLabel = selectedOption
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : placeholder;

  return (
    <div className="custom-select-container" ref={containerRef}>
      {label && <span className="label-caps custom-select-label">{label}</span>}
      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="custom-select-value">{displayLabel}</span>
        <ChevronDown size={16} className={`custom-select-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="custom-select-dropdown animate-fade-in">
          {options.map((opt) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = optValue === value;

            return (
              <div
                key={optValue}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onChange(optValue);
                  setIsOpen(false);
                }}
              >
                <span>{optLabel}</span>
                {isSelected && <Check size={14} className="gold-text" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
