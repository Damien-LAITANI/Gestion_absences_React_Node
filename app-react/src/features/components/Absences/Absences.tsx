import AbsenceForm from '../AbsenceForm/AbsenceForm';
import AbsenceList from '../AbsenceList/AbsenceList';
import AbsenceModal from '../AbsenceModal/AbsenceModal';

const Absences = () => {
	return (
		<>
			<AbsenceList />
			<AbsenceForm />
			<AbsenceModal />
		</>
	);
};

export default Absences;
