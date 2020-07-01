const initialState = {
  cursos:{}
}

const coursereducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SAVE_COURSES':
    state=action.payload
    initialState.cursos=state
    console.log("---------------------cursos guardados en reducer----------------------")
    console.log(initialState.cursos)
    console.log("---------------------cursos guardados en reducer----------------------")
      return true

    default:
      return state
  }
}

export default coursereducer
