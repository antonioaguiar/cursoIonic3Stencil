import { Component, Prop, State, Event, EventEmitter, h, Listen, Watch } from '@stencil/core';


@Component({
  tag: 'app-todo',
  styleUrl: 'app-todo.css',
  shadow: true
})
export class AppTodo {

  @Prop() tarefas: Array<{ feito: boolean; descricao: string }> = [];
  @State() input: string = " ";
  @Event() emiteTotal: EventEmitter;
  @Listen('keydown') operaTeclaPressioada(ev) {
    // console.log(ev.keyCode);
    // Escuta o evento ENTER do teclado e executa salvar
    if (ev.keyCode === 13)
      this.salvar();
  }

  //recebe a classe de validação do input
  @State() validacao: string = 'ok';

  @State() caracteres: number = 0;

  //vai observar o tamanho da string input e manipular a validaçao
  @Watch('input') validaInput(novoValor, valorAntigo) {
    console.log(valorAntigo); //está aqui só para mostrar que pode passar dois parametros...
    this.caracteres = novoValor.length;
    //console.log(valorAntigo);
    if (novoValor.length < 50) this.validacao = 'ok'
    else if (novoValor.length > 50 && novoValor.length < 90)
      this.validacao = 'warning'
    else this.validacao = 'danger';

  }

  /*
  * Alterar o valor da propriedade input
  */
  alteraInput = ev => this.input = ev.target.value;

  /*
  *  grava elemento no array de tarefas 
  */

  salvar = () => {
    if (this.input != "" && this.input.trim() != "") {
      this.tarefas = [...this.tarefas, { descricao: this.input, feito: false }];
      this.input = "";
    }
  }

  /*
  * Marcar a tarefa como concluída
  */
  concluir = (index) => {
    this.tarefas[index].feito = !this.tarefas[index].feito;
    this.tarefas = [...this.tarefas];
  }

  /*
  * Excluir a tarefa
  */
  excluir = (index) => {
    this.tarefas.splice(index, 1);
    this.tarefas = [...this.tarefas];
  }

  /*
  * Emite o numero de tarefas cadastradas
  */
  totalCadastradas = () => {
    this.emiteTotal.emit(this.tarefas.length);
  }

  render() {
    return (
      <div class="todo">
        <div class="form-todo">
          <h2 class="titulo">TODO List</h2>
          <div class="input">
              <div class="wrap-input">
              <label class="input--descricao">Nova tarefa</label>
              <input type="text" class={`${this.validacao} input--campo`}
                maxlength="100" onInput={(ev) => this.alteraInput(ev)} value={this.input} />
            </div>
            <label>caracteres:{`${this.caracteres}`}/100</label>
            <button class="input--botao" onClick={() => this.salvar()}> Adicionar</button>
          </div>
          <div class="lista">
            {this.tarefas.length > 0 ? [
              this.tarefas.map((tarefa, index) => (
                <div class="tarefa">
                  <div>
                    <input type="checkbox" class="tarefa-alterar" onChange={() => this.concluir(index)} value="" />
                    <label class={`${tarefa.feito ? 'concluido' : ''} tarefa-descricao`}>{tarefa.descricao}</label>
                  </div>
                  <button class="tarefa-excluir" onClick={() => this.excluir(index)}>X</button>
                </div>
              )), <br />, <button onClick={() => this.totalCadastradas()}>Total</button>
            ] : (
                <h2 class="lista--vazia">Você não possui tarefas!</h2>
              )}
          </div>
        </div>
      </div>
    )
  }
}
