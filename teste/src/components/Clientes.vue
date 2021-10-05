<template>
  <div>
    <form class="col-md-4 offset-md-4">
      <p class="lead">
        <strong>Formulário de Cadastro</strong>
      </p>
      <div class="mb-3">
        <label for="nome" class="form-label">Nome:</label>
        <input type="hidden"  id="id" name="id">
        <input
          type="text"
          class="form-control"
          v-model="cliente.nome"
          id="nome"
          placeholder="Digite o seu Nome"
          maxlength="200"
          required
        />
      </div>
      <div class="mb-3">
        <label for="CPF" class="form-label">CPF:</label>
        <input
          type="text"
          class="form-control"
          id="CPF"
          v-model="cliente.cpf"
          placeholder="___.___.___-__"
          maxlength="14"
          v-mask="'###.###.###-##'"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="cliente.email"
          maxlength="50"
          placeholder="teste@teste.com"
          required
        />
      </div>
      <button v-on:click="salvar()" type="button" class="btn btn-primary">Salvar</button>
    </form>

    <div style="color: red">
      {{mensagem}}
    </div>
    <br>
    <p class="lead">Total de Clientes Cadastrados: ({{clientes.length}})</p>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" v-bind:key="cliente.id">
          <td>
            {{ cliente.nome }}
          </td>
          <td>
            {{ cliente.cpf }}
          </td>
          <td>
            {{ cliente.email }}
          </td>
          <td>
            <button class="btn btn-primary" v-on:click="editar(cliente)">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="excluir(cliente.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {

  name: "Clientes",
  props: {
    msg: String,
    
  },
  data: () => {
    return {
      clientes: [],
      cliente: {nome:"", cpf:"", email:""},
      mensagem: ""
    }
  },
  methods: {
    lista() {
      axios.get("https://backendtestegrupo.azurewebsites.net/clientes").then((res) => {
        this.clientes = res.data;
      });
    },
    salvar() {
      if(!this.cliente.nome == "" && !this.cliente.cpf == "" && !this.cliente.email==""){
          if(this.cliente.id){
            this.alterar()
          return
        }
        axios.post("https://backendtestegrupo.azurewebsites.net/clientes", this.cliente).then(() => {
          this.lista()
            this.cliente = {nome:"", cpf:"", email:""}
        }).catch((error) => {
          console.log(error)
          alert('Favor verificar o CPF e Email informados, já temos esses dados salvos!');
        });
      }else{
        alert('Preencha os campos vazios');
      }
    },
    excluir(id) {
      if(confirm("Confirma a exclusão?")){
        axios.delete(`https://backendtestegrupo.azurewebsites.net/clientes/${id}`).then(() => {
            this.lista()
        })
      }
    },
    editar(cliente) {
      this.cliente = cliente
    },
    alterar() {
     if(!this.cliente.nome == "" && !this.cliente.cpf == "" && !this.cliente.email==""){ 
        axios.put(`https://backendtestegrupo.azurewebsites.net/clientes/${this.cliente.id}`, this.cliente).then(() => {
            this.lista()
            this.cliente = {nome:"", cpf:"", email:""}
        }).catch((error) => {
            console.log(error)
            this.lista();
            alert('Favor verificar o CPF e Email informados, já temos esses dados salvos!');
        });
      }else{
        this.lista();
        alert('Preencha os campos vazios');
      }
    }
  },
  created() {
    this.lista();
  },
};
</script>
