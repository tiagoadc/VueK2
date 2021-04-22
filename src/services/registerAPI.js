import { http } from './config'

export default {    
    listar: () => {
        return http.get('findAllEndereco')
    },
    postEndereco: (endereco) => {
        http.post('postEndereco', endereco)

    },
    getEndereco: (cep) => {
        return http.get('GetCepEspecific/' + cep)
    },
    deleteEndereco: (cep) => {
        return http.delete('deleteEndereco/' + cep)
    },
    updateEndereco: (id, endereco) =>{
        http.put('editEndereco/' +id, endereco)
    }


}