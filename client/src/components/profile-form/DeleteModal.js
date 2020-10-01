import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./DeleteModal.css";

const DeleteModal = ({ deleteAccount }) => {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.75)",
		},
	};

	Modal.setAppElement("#root");

	const [modalIsOpen, setModal] = useState(false);

	return (
		<div className="DeleteModal">
			<button onClick={(e) => setModal(true)} className="danger__delete">
				Danger Zone
			</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={(e) => setModal(false)}
				style={customStyles}
				closeTimeoutMS={300}
			>
				<h2>Are you sure?</h2>
				<p>
					This action <strong>CANNOT</strong> be undone.
				</p>
				<button className="confirm__detele" onClick={(e) => deleteAccount()}>
					Confirm Delete
				</button>
				<button className="delete__cancel" onClick={(e) => setModal(false)}>
					Go Back
				</button>
			</Modal>
		</div>
	);
};

DeleteModal.propTypes = {
	deleteAccount: PropTypes.func.isRequired,
};

export default DeleteModal;
