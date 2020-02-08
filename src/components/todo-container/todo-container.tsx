import { Component, Listen, h, Method, Element } from '@stencil/core';
 

@Component({
  tag: 'todo-container',
  styleUrl: 'todo-container.css',
  shadow: true
})
export class TodoContainer {
  /**
   * The first name
   */
  //@Prop() first: string;
  
  
  @Element() componenteAtual: HTMLElement;
   
  //expor metodo para api publica
  @Method() saudacao(){
    alert('Bem vindo ao todo-list!');
    console.log(this.componenteAtual);
  }

  /*
  * Escuta o evento de total de tarefas cadastradas.
  */
  @Listen('emiteTotal') alertInformationTotal(ev: CustomEvent){
    console.log(ev);
    alert(`Total de ${ev.detail} tarefa(s)!`);
  }
 
  render() {
    return  (<app-todo></app-todo>);
  }
}
