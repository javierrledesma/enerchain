/*
 * action types
 */

export const SAVE_WEB3 = 'SAVE_WEB3';
export const SAVE_ACCOUNTS = 'SAVE_ACCOUNTS';
export const SAVE_ACADEMY = 'SAVE_ACADEMY';
export const SAVE_VALUE = 'SAVE_VALUE';
export const SAVE_USER_INFORMATION = 'SAVE_USER_INFORMATION'
export const SAVE_USER_COURSES = 'SAVE_USER_COURSES'
export const SAVE_USER_COURSES_AS_TUTOR = 'SAVE_USER_COURSES_AS_TUTOR'
export const SAVE_MIS_MEDIDAS = 'SAVE_MIS_MEDIDAS'
export const  SAVE_CONTRACT_STORAGE = 'SAVE_CONTRACT_STORAGE'
export const SAVE_CONTRACT_CLIENT= 'SAVE_CONTRACT_CLIENT'
export const SAVE_USER_LIST= 'SAVE_USER_LIST'


/*
 * action creators
 */

export function SaveMisMedidas(misMedidas){
    return {
        type: 'SAVE_MIS_MEDIDAS',
        misMedidas
    }
}

export function saveUserCoursesAsTutor(myCoursesAsTutor){
    return {
        type: 'SAVE_USER_COURSES_AS_TUTOR',
        myCoursesAsTutor
    }
}

export function saveUserCourses(myCourses){
    return {
        type: 'SAVE_USER_COURSES',
        myCourses
    }
}

export function saveUserInformation(user){
    return {
        type: 'SAVE_USER_INFORMATION',
        user
    }
}

export function saveWeb3(web3){
    console.log(web3)
    return {
        type: 'SAVE_WEB3',
        web3
    }
}

export function saveAccounts(accounts){
    return {
        type: 'SAVE_ACCOUNTS',
        accounts
    }
}

export function saveAcademy(academy){
    return {
        type: 'SAVE_ACADEMY',
        academy
    }
}

export function saveContractStorage(contractStorage){
    return {
        type: 'SAVE_CONTRACT_STORAGE',
        contractStorage
    }
}

export function saveContractClient(contractClient){
    return {
        type: 'SAVE_CONTRACT_CLIENT',
        contractClient
    }
}

export function saveUsers(users){
    return {
        type: 'SAVE_USER_LIST',
        users
    }
}

export function saveValue(value){
    return {
        type: 'SAVE_VALUE',
        value
    }
}
