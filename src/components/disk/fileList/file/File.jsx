import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import Delete from "../../../../assets/img/trash-outline.svg";
import Download from "../../../../assets/img/cloud-download-outline.svg";


const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='file' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                // <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">завантажити</button>
                <img src={Download} alt="" className="file__btn file__download" onClick={(e) => downloadClickHandler(e)} />}
                {/* <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">видалити</button> */}
                <img src={Delete} alt="" className="file__btn file__delete" onClick={(e) => deleteClickHandler(e)} />
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    // <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">завантажити</button>
                    <img src={Download} alt="" className="file-plate__btn file-plate__download" onClick={(e) => downloadClickHandler(e)} />}
                    {/* <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">видалити</button> */}
                    <img src={Delete} alt="" className="file-plate__btn file-plate__delete" onClick={(e) => deleteClickHandler(e)} />
                </div>
            </div>
        );
    }

};

export default File;
