import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'react-bootstrap'; // Giả sử bạn đang dùng react-bootstrap

export const DropFiles = (props) => {
	const [files, setFiles] = useState([]);

	// Nhận hàm `onFilesSelected` từ props để truyền file lên component cha
	const { onFilesSelected } = props;

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			// Cập nhật file trong state của component
			const updatedFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			);

			setFiles(updatedFiles);

			// Truyền các file đã chọn lên component cha
			if (onFilesSelected) {
				onFilesSelected(updatedFiles); // Gọi callback từ props
			}
		}
	});

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<Image loading="lazy" src={file.preview} style={img} alt={file.name} />
			</div>
		</div>
	));
	const thumbsName = files.map((file) => (
		<div  key={file.name}>
			<div style={thumbInner}>
				<p> {file.name} </p>
			</div>
		</div>
	));
	useEffect(() => {
		// Hủy bỏ URL để tránh rò rỉ bộ nhớ
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	return (
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<div className="text-center">Select files</div>
			</div>
{/* 			
			<aside style={thumbsContainer}>{thumbs}</aside>
			<aside style={thumbsContainer}>{thumbsName}</aside>

			 */}
		</section>
	);
};

// Styles (giữ nguyên như trong ví dụ của bạn)
const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16
};

const thumb = {
	display: 'inline-flex',
	justifyContent: 'center',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 250,
	height: 250,
	padding: 4,
	boxSizing: 'border-box'
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};
