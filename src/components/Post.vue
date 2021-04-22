<template>
  <div>
    <div style="width: 50%; margin: 0 auto; margin; margin-top: 25px;">
      <div style="display: flex; flex-row">
        <input
          required
          v-mask="'#####-###'"
          type="text"
          style="margin-top: 25px; margin-right: 10px"
          class="form-control"
          placeholder="Cep"          
          v-model="endereco._cep"
        />
        
        <button
          type="submit"
          style="margin-top: 25px; width: 20%; font-size: 15px"
          class="btn btn-primary"
          v-on:click="getEndereco"
        >
          Buscar Cep
        </button>
      </div>
      <p>Cep em tempo real aqui: {{endereco._cep}}</p>
      <input
        type="text"
        style="margin-top: 25px"
        class="form-control"
        placeholder="Logradouro"
        v-model="endereco.logradouro"
      />
      <input
        type="text"
        style="margin-top: 25px"
        class="form-control"
        placeholder="Complemento"
        v-model="endereco.complemento"
      />
      <input
        type="text"
        style="margin-top: 25px"
        class="form-control"
        placeholder="Bairro"
        v-model="endereco.bairro"
      />
      <input
        type="text"
        style="margin-top: 25px"
        class="form-control"
        placeholder="Estado"
        v-model="endereco.estado"
      />
      <button
        type="submit"
        style="margin-top: 25px"
        class="btn btn-primary"
        v-on:click="saveEndereco"
      >
        Savar Cep
      </button>

       <button
        type="submit"
        style="margin-top: 25px; margin-left: 25px"
        class="btn btn-primary"
        v-on:click="updateEndereco"
      >
        Editar
      </button>
      
      <button
        type="submit"
        style="margin-top: 25px; margin-left: 25px"
        class="btn btn-primary"
        v-on:click="updateGrid"
      >
        Atualizar
      </button>
     
      <button
        type="submit"
        style="margin-top: 25px; margin-left: 25px"
        class="btn btn-primary"
        v-on:click="clearEndereco"
      >
        Limpar
      </button>
    </div>

    <table
      class="table"
      style="width: 50%; margin: 0 auto; margin; margin-top: 25px;"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">CEP</th>
          <th scope="col">Logradouro</th>
          <th scope="col">Complemento</th>
          <th scope="col">Bairro</th>
          <th scope="col">Estado</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(endereco, index) in enderecos" :key="endereco.id">
        <tr>
          <th scope="row">{{ index }}</th>
          <td>{{ endereco._cep }}</td>
          <td>{{ endereco.logradouro }}</td>
          <td>{{ endereco.complemento }}</td>
          <td>{{ endereco.bairro }}</td>
          <td>{{ endereco.estado }}</td>
          <td>
            <button type="button" class="btn btn-primary" v-on:click="Remove(index, endereco._cep)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import register from "../services/registerAPI";
import {mask} from 'vue-the-mask'
export default {
  directives: {mask},
  data() {
    return {
      endereco: {
        _cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        estado: "",
      },
      enderecos: [],
      id: String
      
    };
  },
  methods: {  
    saveEndereco() {      
      if (this.endereco._cep != "" && this.endereco.estado != "") {
        register.getEndereco(this.endereco._cep).then((resposta) => {
          console.log(resposta)
          if (resposta.data == null) {
            register.postEndereco(this.endereco);                                   
            this.clearEndereco();
            alert("Cep cadastrado com sucesso!!");
          } else {
            alert("cep ja cadastrado");
          }
        });
      } else {
        alert("Preencha ao menos o Cep e o Estado");
      }
      
    },

    clearEndereco() {
      this.endereco._cep = "";
      this.endereco.logradouro = "";
      this.endereco.complemento = "";
      this.endereco.bairro = "";
      this.endereco.estado = "";
      this.id = ''
    },
    getEndereco() {
      if (this.endereco._cep != "") {
        register.getEndereco(this.endereco._cep).then((resposta) => {
          if (resposta.data != null) {
            this.endereco._cep = resposta.data._cep;
            this.endereco.logradouro = resposta.data.logradouro;
            this.endereco.complemento = resposta.data.complemento;
            this.endereco.bairro = resposta.data.bairro;
            this.endereco.estado = resposta.data.estado;
            this.id = resposta.data._id
            
          } else {
            alert("Cep não encontrado");
          }
        });
      } else {
        alert("Digite um valor para o campo de Cep");
      }
    },
    Remove(index, _cep){ 
      if(confirm("Deseja excluir esse endereço?")){     
      this.enderecos.splice(index, 1)
      register.deleteEndereco(_cep)
      }
     
    },
    updateGrid(){
      register.listar().then((resposta) =>{
        this.enderecos = resposta.data
        
      })
      
    },
    updateEndereco(){  
      if(this.endereco._cep != '' && this.id != '' && this.endereco.estado != ''){    
      register.updateEndereco(this.id, this.endereco)
      alert("Endereço atualizado com sucesso")
      }
      else{
        alert("Busque um cep da lista para editar")
      }
    }
  },
  mounted() {
    register.listar().then((resposta) => {
      this.enderecos = resposta.data;
    });
  },
};
</script>