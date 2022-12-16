import { IAbsence } from '../../../services/InterfacesServices/IUserService';

interface IAbsenceModalProps {
	absenceToDelete: IAbsence;
	deleteAbsence: Function;
}

const AbsenceModal = ({
	absenceToDelete,
	deleteAbsence,
}: IAbsenceModalProps) => {
	const startDate = new Date(absenceToDelete.startDateISO.split('T')[0]);
	const endDate = new Date(absenceToDelete.endDateISO.split('T')[0]);

	return (
		<div
			id="deleteAbsence"
			className="modal fade"
			tabIndex={-1}
			data-bs-dismiss="modal"
		>
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
						<p>Date de début : {startDate.toLocaleDateString()}</p>
						<p>Date de fin : {endDate.toLocaleDateString()}</p>
						<p>Type de congé : {absenceToDelete.types}</p>
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
							onClick={() => deleteAbsence(absenceToDelete._id)}
							type="button"
							className="btn btn-success"
						>
							Valider
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AbsenceModal;
