import React, {PropTypes} from 'react'
import ReactModal from 'react-modal'
import BookForm from './BookForm'

const BookModal = ({show, close, bookFormProps}) => {
    return(
        <div>
            <ReactModal
            contentLabel={'Book edit form'}
            isOpen={show}
            style={{overlay: {zIndex: 3}}}
            onRequestClose={() => close()}
            >
                <BookForm {...bookFormProps}/>
            </ReactModal>
        </div>
    )
}

BookModal.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    bookFormProps: PropTypes.object,
}

export default BookModal