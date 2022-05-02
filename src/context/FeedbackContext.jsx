import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // fetch feedback 
    const fetchFeedback = async () => {
        const response = await fetch("http://localhost:4000/feedback?_sort=id&order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }


    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Delete Feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Update Feedback
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...updItem } : item ))
        )

        setFeedbackEdit({
            item: {},
            edit: false,
          })
    }

    // Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        isLoading,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
        </FeedbackContext.Provider>
}

export default FeedbackContext