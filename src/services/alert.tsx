import Swal from 'sweetalert2'

export const successAlert = (message: string) => {
    Swal.fire({
        title: 'Good job!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#FCA311',
        confirmButtonText: 'OK'
    })
}

export const errorAlert = (message: string) => {
    Swal.fire({
        title: 'Oops...',
        text: message,
        icon: 'error',
        confirmButtonColor: '#FCA311',
        confirmButtonText: 'OK'
    })
}