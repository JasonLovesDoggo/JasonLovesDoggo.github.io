import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

const bellaAge = () => {
    const currentYear = new Date().getFullYear();
    const givenYear = new Date('2020-09-19').getFullYear();
    return currentYear - (givenYear + 1);
}

function BellaInfo(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h3>Info about my dog</h3>
                <p>Click <Link onClick={props.set_dog} to="#dog" style={{textDecoration: "none"}}>here</Link> to filter the photos to just Bella.</p>
                <ul>
                    <li>Her name is Bella</li>
                    <li>She is <b className="blue"> {bellaAge()}</b> years old</li>
                    <li>She is a Golden doodle and weighs approximately <b className="blue">65lb</b></li>
                    <li>She enjoys long walks, sleeping, getting muddy & also loves going camping and being off leash</li>
                </ul>
                <p>
                    I hope you enjoy my
                    photos! If you want to see more of them, check out her <a
                    href="https://www.instagram.com/bellathedogeee/" target="_blank"
                                rel="noopener noreferrer" className="insta-text">Instagram</a>
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default BellaInfo;
