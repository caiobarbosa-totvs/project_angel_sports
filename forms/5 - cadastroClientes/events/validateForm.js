function validateForm(form) {
/*  var atividadeAtual = parseInt(getValue("WKNumState"));
  var msgErro = "";

  if (atividadeAtual == getTaskCodes.INICIO) {
    msgErro += validateSolicitation(form);
  } 
  

  if (msgErro != "") {
    msgErro = "<ul>" + msgErro + "</ul>";
    exibirMensagem(
      form,
      "Favor informar os campos <b>obrigatórios:</b><br/>" + msgErro
    );
  }*/
}

/*function validateSolicitation(form) {
  var msgErro = "";

  if (campoVazio(form, "CpfCnpj")) {
    msgErro += "<li>CPF/CNPJ</li>";
  }
  
  if (form.getValue("CpfCnpj") != "" && form.getValue("tipoPessoa") == "- Pessoa Física") {

	if (campoVazio(form, "nomeCompleto")) {
		msgErro += "<li>Nome Completo</li>";
	}
	
	if (campoVazio(form, "dataNascimento")) {
		msgErro += "<li>Data de Nascimento</li>";
	}
  }

  return msgErro;
}

function campoVazio(form, fieldname) {
  if (
    form.getValue(fieldname) == null ||
    form.getValue(fieldname) == undefined ||
    form.getValue(fieldname).trim() == ""
  ) {
    return true;
  }
  return false;
}

function exibirMensagem(form, mensagem) {
  var mobile = form.getMobile() != null && form.getMobile();

  if (mobile) {
    throw mensagem;
  } else {
    throw (
      "<div class='alert alert-warning' role='alert'>" +
      "<strong>Atenção:</strong> " +
      mensagem +
      "</div>" +
      "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI."
    );
  }
}
*/