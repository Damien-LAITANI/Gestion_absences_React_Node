const HolidayModal = ({ holidayToDelete, deleteHoliday }: any) => {
	return (
		<div id="deleteHoliday" className="modal fade" tabIndex={-1}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							Confirmation de suppression
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<p>
							Confirmez-vous la suppression de la demande suivante
							?
						</p>
						<p>Date : {holidayToDelete?.date}</p>
						<p>Type : {holidayToDelete?.type}</p>
						<p>Jour : {holidayToDelete?.jour}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Annuler
						</button>
						<button
							onClick={() => deleteHoliday(holidayToDelete._id)}
							type="button"
							className="btn btn-success"
							data-bs-dismiss="modal"
						>
							Valider
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HolidayModal;
