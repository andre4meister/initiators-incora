import React, { FC, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import styles from './Upload.module.scss';

const Upload: FC = () => {
  const [dragText, setDragText] = useState<string>('Drop files or browse');

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setDragText('Drop files');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setDragText('Drop files or browse');
  };

  const handleOnDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    setDragText(file[0].name);
  };

  return (
    <label
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragStart(e)}
      onDragLeave={(e) => handleDragEnd(e)}
      onDrop={(e) => handleOnDrop(e)}
      className={styles.label}
      htmlFor="file"
    >
      <UploadOutlined className={styles.icon} />
      <span className={styles.text}>
        {dragText}
      </span>
      <input className={styles.input} id="file" type="file" />
    </label>
  );
};

export default Upload;
