import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload(props) {
  const [file, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFiles(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      // accept only pdf files and csv files
      accept: {
        'application/pdf': '.pdf',
        '.csv': [
          '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values',
        ],
      },
      noClick: true,
    });

  return (
    <div {...getRootProps()}>
      <input
        onChange={(e) => props.setFile(e.target.files[0])}
        {...getInputProps()}
      />
      <div id="upload-file">
        <div className="flex justify-start mx-16 mt-2">
          <label
            htmlFor="dropzone-file"
            className={
              props.status === 'sudah' || props.semester === ''
                ? 'flex flex-col items-center justify-center w-full h-64 border rounded-xl hover:bg-gray-100 '
                : 'flex flex-col items-center justify-center w-full h-64 border rounded-xl cursor-pointer hover:bg-gray-100 hover:border-violet-500'
            }
          >
            {isDragReject ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <div className="flex justify-start mx-16 mt-2">
                  <p className="text-red-500">File harus berformat PDF</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                {file && file.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        {props.filename ? props.filename : 'Upload file'}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {props.filename
                        ? ''
                        : props.filetype == 'pdf'
                        ? 'PDF up to 10MB'
                        : props.filetype == 'csv'
                        ? 'CSV up to 10MB'
                        : ''}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">
                      {file && file.name}
                    </span>
                  </p>
                )}
              </div>
            )}
            <input
              disabled={props.status == 'sudah' || props.semester == ''}
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => props.setFile(e.target.files[0])}
              accept={
                props.filetype == 'pdf'
                  ? 'application/pdf'
                  : props.filetype == 'csv'
                  ? '.csv'
                  : ''
              }
            />
          </label>
        </div>
        {props.validFile ? null : (
          <div className="flex justify-start mx-16 mt-2">
            <p className="text-red-500">File harus berformat PDF</p>
          </div>
        )}
      </div>
    </div>
  );
}
