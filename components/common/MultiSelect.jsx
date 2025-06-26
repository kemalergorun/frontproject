"use client";

import { useRef, useState } from "react";
import styles from "@/styles/components/common/multi-select.module.scss";
import { toggleItemSelection } from "@/utils/functions/toggle-item-selection";
import { extractLessonPrograms } from "@/utils/functions/extract-lesson-programs";

export const MultiSelect = ({
  data,
  name,
  title,
  defaultValues,
  isLessonProgram,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    defaultValues ? defaultValues.map((item) => item.value) : []
  );

  const processedData = isLessonProgram ? extractLessonPrograms(data) : data;

  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <fieldset className={styles.dropdown} ref={dropdownRef}>
      <input type="hidden" name={name} value={selectedItems} />
      <button
        type="button"
        className={styles.button}
        title={`Select ${title}`}
        onClick={handleDropdown}
      >
        {selectedItems.length > 0
          ? `${selectedItems.length} selected`
          : `Select ${title}`}
      </button>
      {isDropDownOpen && (
        <div className={styles.panel}>
          {processedData.map((item, index) => (
            <fieldset className={styles.inputGroup} key={index}>
              <input
                type="checkbox"
                id={item.value}
                checked={selectedItems.includes(item.value)}
                onChange={() => {
                  toggleItemSelection(item.value, setSelectedItems);
                }}
              />
              <label htmlFor={item.value} title={item.label}>
                {item.label}
              </label>
            </fieldset>
          ))}
        </div>
      )}
    </fieldset>
  );
};
