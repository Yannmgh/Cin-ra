import { useState } from 'react'

// Hook générique pour gérer les champs d'un formulaire contrôlé
// sans avoir à écrire un useState + un handler par champ.
function useForm(initialValues) {
    const [values, setValues] = useState(initialValues)

    function handleChange(event) {
        const { name, value } = event.target
        setValues((current) => ({ ...current, [name]: value }))
    }

    function reset() {
        setValues(initialValues)
    }

    return { values, handleChange, setValues, reset }
}

export default useForm
