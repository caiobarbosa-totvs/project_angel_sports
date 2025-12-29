var INICIO = 4

function setSelectedZoomItem(selectedItem) {
	
	if (selectedItem.inputId.indexOf("___") > -1) {
		var indice = selectedItem.inputId.split("___")[1];
	}
	
	if (selectedItem.inputId == "zoomNomeCompleto") {
		window['zoomcpfCnpj'].setValue(selectedItem.A1_CGC);

		var retornaDadosClientes = recuperaDadosClientes(selectedItem.A1_COD+selectedItem.A1_LOJA)
        retornaDadosClientes.then(function(dados) {
        	console.log(dados);
        	preencheCamposClientes(dados);
        	verificaCGC();
        }).catch(erro => {            			
        	FLUIGC.toast({message : "Problema para recuperar os dados.", type: "warning"});
            console.error(erro);
        });	
		
	}
	
/*	if (selectedItem.inputId == "zoomNomeCompleto") {		
		
		var retornaDadosClientes = recuperaDadosClientes(selectedItem.A1_COD+selectedItem.A1_LOJA)
	        retornaDadosClientes.then(function(dados) {
	        	console.log(dados)
	        	preencheCamposClientes(dados)
	        }).catch(erro => {            			
	        	FLUIGC.toast({message : "Problema para recuperar os dados.", type: "warning"});
	            console.error(erro);
	        });		
		
		window['zoomcpfCnpj'].setValue(selectedItem.A1_CGC);
		$('#dataNascimento').val(selectedItem.dataNascimento);
		$('#cep').val(selectedItem.cep);
		$('#rua').val(selectedItem.rua);
		$('#bairro').val(selectedItem.bairro);
		$('#numero').val(selectedItem.numero);
		$('#cidade').val(selectedItem.cidade);
		$('#uf').val(selectedItem.uf);
		$('#endExterior').val(selectedItem.enderecoExt);
		$('#nifIcamaId').val(selectedItem.nifIcamaIdEstrangeiro);
		$('#nomeConjuge').val(selectedItem.conjuge);
		$('#cpfConjuge').val(selectedItem.cpfConjuge);
		$('#saidaDefinitiva').val(selectedItem.saidaDefinitiva);
		$('#telefoneBrasil').val(selectedItem.telefoneBrasil);
		$('#telefoneExterior').val(selectedItem.telefoneExterior);
		
		$('#banco').val(selectedItem.banco);
		$('#agencia').val(selectedItem.agencia);
		$('#digitoAgencia').val(selectedItem.digitoAgencia);
		$('#conta').val(selectedItem.conta);
		$('#digitoConta').val(selectedItem.digitoConta);
		$('#situacao').val(selectedItem.situacao);
		$('#tipoConta').val(selectedItem.tipoConta);
		$('#formaPagDB').val(selectedItem.formaPagDB);
	}*/
		
/*		$('#a1cod').val(selectedItem.A1_COD);
		$('#a1loja').val(selectedItem.A1_LOJA);*/
	
	if (selectedItem.inputId == "zoomcpfCnpj") {
		window['zoomNomeCompleto'].setValue(selectedItem.A1_NOME);
		
		var retornaDadosClientes = recuperaDadosClientes(selectedItem.A1_COD+selectedItem.A1_LOJA)
        retornaDadosClientes.then(function(dados) {
        	console.log(dados);
        	preencheCamposClientes(dados);
        	verificaCGC();
        }).catch(erro => {            			
        	FLUIGC.toast({message : "Problema para recuperar os dados.", type: "warning"});
            console.error(erro);
        });	
		
	}
	
	if (selectedItem.inputId == "uf") {
		$('#codUF').val(selectedItem.X5_CHAVE);
		reloadZoomFilterValues("municip", "ESTADO,"+selectedItem.X5_CHAVE);
	}
	
	if (selectedItem.inputId == "municip") {
		$('#codMun').val(selectedItem.CC2_CODMUN);
	}
	
	if (selectedItem.inputId == "DDI") {
		$('#codDDI').val(selectedItem.ACJ_DDI);
	}
	
	if (selectedItem.inputId == "banco___"+indice) {
		$('#idBanco___'+indice).val(selectedItem.codigoBanco);
	}		
	requiredFieldsRule();
}

function removedZoomItem(removedItem) {
	
	if (removedItem.inputId.indexOf("___") > -1) {
		var indice = removedItem.inputId.split("___")[1];
	}	
	
	if (removedItem.inputId == "zoomNomeCompleto") {
		window['zoomcpfCnpj'].clear();
		limpaCamposAutomaticos();
		escondeCampos();
	}
	
	if (removedItem.inputId == "zoomcpfCnpj") {
		window['zoomNomeCompleto'].clear();
		limpaCamposAutomaticos();
		escondeCampos();
	}
	
	if (removedItem.inputId == "uf") {
		$('#codUF').val("");
		reloadZoomFilterValues("cidade", "ESTADO,");
		window["municip"].clear()
		$('#codMun').val("");
	}
	
	if (removedItem.inputId == "municip") {
		$('#codMun').val("");
	}
	
	if (removedItem.inputId == "DDI") {
		$('#codDDI').val("");
	}
	
	if (removedItem.inputId == "banco___"+indice) {
		$('#idBanco___'+indice).val("");
	}	
		
}

function limpaCamposAutomaticos() {
	
	$("#nomeCompleto").val("");
	$("#cpfCnpj").val("");
	$("#numeroRg").val("");
	$("#dataVencRg").val("");
	$("#numPassaporte").val("");
	$("#dataVencPassaporte").val("");
	
    $("#a1cod").val("");
    $("#a1loja").val("");
    $("#cep").val("");
    $("#rua").val("");
    $("#numero").val("");
    $("#a1pessoa").val("");
    window['uf'].clear();
    $("#codUF").val("");
    window['municip'].clear();
    $("#codMun").val("");
    
    window["DDI"].clear();
    
    $("#bairro").val("");
    $("#email").val("");
    $("#dataNascimento").val("");
    $("#dataAbertura").val("");
    $("#telefoneBrasil").val("");
}

function verificaCGC(){
	//var cgc = $("#cpfCnpj").text();
	var tamanho = verificaCPFCNPJ();
	
	if (tamanho == 11) {
		$(".secPessoaJuridica").hide();
		$(".secPessoaFisica").show();
		$("#tipoPessoaFJ").val("- Pessoa Física");
	} else if (tamanho == 14) {
		$(".secPessoaFisica").hide();
		$(".secPessoaJuridica").show();
		$("#tipoPessoaFJ").val("- Pessoa Jurídica");
	} else{
		FLUIGC.toast({
			title: 'Atenção: ',
			message: 'Digite um CPF ou CNPJ válidos!',
			type: 'warning'
		});
		$("#cpfCnpj").val("");
		$("#tipoPessoaFJ").val("");
		escondeCampos();
	}
}

function recuperaDadosClientes(id_cliente){
	
	return new Promise(resolve => {
		
    	let loading = FLUIGC.loading(window, {
    		textMessage : "Recuperando dados..."
    	});
    	loading.show();
    	
    	let errorHandled = false; // Variável para rastrear se o erro já foi tratado
	
		var cId_Cliente = DatasetFactory.createConstraint('A1_COD', id_cliente, id_cliente, ConstraintType.MUST);

    	DatasetFactory.getDataset("ds_retornaClienteProtheus", null, new Array(cId_Cliente), null, {
    		success : function(dados){
    			
    			if (!errorHandled) { // Verifica se o erro já foi tratado
        			try {
            			if(dados != null && dados.values.length > 0 && dados.values[0].status == undefined ){
            				FLUIGC.toast({message : "Dados recuperados com sucesso.", type: "success"});   				
            			} else {
            				FLUIGC.toast({message : "Não foi possível recuperar os dados.", type: "warning"});
            			}
            			loading.hide();	
            			resolve(dados.values);            						
        			} catch (err) {
    	    			console.log("Não foi possível recuperar os dados: ", err);
    	    			FLUIGC.toast({message : "Não foi possível recuperar os dados", type: "danger"});
    	    			loading.hide();
    	    			errorHandled = true; // Define a variável como true para indicar que o erro foi tratado
        			}
    			}
    			
    		}, error : function(err){
    			if (!errorHandled) { // Verifica se o erro já foi tratado
	    			console.log("Não foi possível recuperar os dados: ", err);
	    			FLUIGC.toast({message : "Não foi possível recuperar os dados", type: "danger"});
	    			loading.hide();
	    			errorHandled = true; // Define a variável como true para indicar que o erro foi tratado
    			}
    		}
		
    	})
    	
	});
	
}

function preencheCamposClientes(retornoDataset) {
    const [registro] = retornoDataset;

    const {
        A1COD: a1cod,
        A1NOME: a1nome,
        A1LOJA: a1loja,
        A1CNAE: a1cnae,
        A1CEP: cep,
        A1END: rua,
        A1COMPLEM: numero,
        A1PESSOA: a1pessoa,
        A1XTIPOCL: catCliente,
        A1EST: uf,
        A1ESTNOM: estado,
        A1CODMUN: codCidade,
        A1MUN: cidade,
        A1BAIRRO: bairro,
        A1EMAIL: email,
        A1DTNAS: dataNascimento,
        A1DDD: ddd,
        A1DDI: ddi,
        A1TEL: telefone,
        
        A1XIBAN: iban,
        A1XBAN: bancoIdent,
        A1XSPREAD: spreadAcordado,
        A1XRESPON: responsavel,
        A1XTELEXT: telefoneExterior,
        A1XNOMSOC: socioMarjoritario,
        A1XCPFMAJ: cpfMarjoritario,
        A1XENDSOC: enderecoSocio,
        A1XENDEXT: enderecoExt,
        A1XORISOL: orgemSolic,
        A1XNIFIID: nifIcamaIdEstrangeiro,
        A1PFISICA: numeroRg,
        A1XPASS: numPassaporte,
        
        A1XCONJ: conjuge,
        A1XNACONJ: dataNascConjuge,
        A1XCPFCON: cpfConjuge,
        A1XSAIDEF: saidaDefinitiva,
        
        A1XINCTR: dataInicioCt,
        A1XFIMCTR: dataFimCt,
        A1XVENCRG: dataVencRg,
        A1XVENPAS: dataVencPassaporte
    } = registro;
    
    $("#iban").val(iban);
    $("#bancoIdent").val(bancoIdent);
    $("#spreadAcordado").val(spreadAcordado);
    $("#responsavel").val(responsavel);
    $("#telefoneExterior").val(telefoneExterior);
    $("#socioMarjoritario").val(socioMarjoritario);
    $("#cpfMarjoritario").val(cpfMarjoritario);
    $("#enderecoSocio").val(enderecoSocio);
    $("#enderecoExt").val(enderecoExt);
    $("#orgemSolic").val(orgemSolic);
    $("#nifIcamaIdEstrangeiro").val(nifIcamaIdEstrangeiro);
    $("#numeroRg").val(numeroRg);
    $("#numPassaporte").val(numPassaporte);
    
    $("#conjuge").val(conjuge);
    $("#dataNascConjuge").val(formatarDataAAAAMMDDParaDDMMYYYY(dataNascConjuge));
    $("#cpfConjuge").val(cpfConjuge);
    $("#saidaDefinitiva").val(formatarDataAAAAMMDDParaDDMMYYYY(saidaDefinitiva));
    $("#dataInicioCt").val(formatarDataAAAAMMDDParaDDMMYYYY(dataInicioCt));
    $("#dataFimCt").val(formatarDataAAAAMMDDParaDDMMYYYY(dataFimCt));
    
    $("#a1cod").val(a1cod);
    $("#a1loja").val(a1loja);
    $("#cep").val(cep);
    $("#rua").val(rua);
    $("#numero").val(numero);
    $("#a1pessoa").val(a1pessoa);
    
    $("#dataVencRg").val(formatarDataAAAAMMDDParaDDMMYYYY(dataVencRg));
    $("#dataVencPassaporte").val(formatarDataAAAAMMDDParaDDMMYYYY(dataVencPassaporte));    
    
    window['uf'].setValue({"X5_CHAVE":uf, "X5_DESCRI":estado});
    window['municip'].setValue({"CC2_MUN": cidade, "CC2_CODMUN": codCidade});
    
    window['DDI'].setValue({"ACJ_DDI":ddi, "ACJ_PAIS":"BRASIL"});// Alterar
    
/*    $("#municip").val(cidade);*/
    
    $("#bairro").val(bairro);
    $("#email").val(email);    
    $("#telefoneBrasil").val(telefone);
    $("#numero").val(numero);
    
    if (a1pessoa === "F") {
        $("#dataNascimento").val(formatarDataAAAAMMDDParaDDMMYYYY(dataNascimento));
    }else{
    	$("#razaoSocial").val(a1nome);//continuar
    	$("#cnae").val(a1cnae);
    	$("#dataAbertura").val(formatarDataAAAAMMDDParaDDMMYYYY(dataNascimento));
    }
    
    //$("#telefoneBrasil").val(`(${ddd})${formatarTelefone(telefone)}`);
}

function formatarCPFouCNPJ(numero) {
    // Remover todos os caracteres não numéricos
    var numeroLimpo = numero.replace(/\D/g, '');

    // Verificar se é CPF (11 dígitos) ou CNPJ (14 dígitos)
    if (numeroLimpo.length === 11) {
        // Aplicar máscara de CPF: 999.999.999-99
        return numeroLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numeroLimpo.length === 14) {
        // Aplicar máscara de CNPJ: 99.999.999/9999-99
        return numeroLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
        // Se o número não corresponder a um CPF ou CNPJ válido, retornar o número original
        return numero;
    }
}

function formatarDataAAAAMMDDParaDDMMYYYY(dataAAAAMMDD) {
    // Extrair o ano, mês e dia da data fornecida
	
	if(dataAAAAMMDD != undefined && dataAAAAMMDD != null){
		
	    var ano = dataAAAAMMDD.slice(0, 4);
	    var mes = dataAAAAMMDD.slice(4, 6);
	    var dia = dataAAAAMMDD.slice(6, 8);

	    // Formatar a data como DD/MM/AAAA
	    var dataFormatada = dia + '/' + mes + '/' + ano;

	    return dataFormatada;		
		
	}else{
		return "";
	}

}

function formatarTelefone(numeroTelefone) {
    // Remover todos os caracteres não numéricos
    var numeroLimpo = numeroTelefone.replace(/\D/g, '');

    // Verificar se é um número de telefone com 8 ou 9 dígitos
    if (numeroLimpo.length === 8) {
        // Aplicar máscara para números de 8 dígitos: 1234-5678
        return numeroLimpo.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (numeroLimpo.length === 9) {
        // Aplicar máscara para números de 9 dígitos: 12345-6789
        return numeroLimpo.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else {
        // Se o número não corresponder a um número de telefone válido, retornar o número original
        return numeroTelefone;
    }
}

$( document ).ready(function(){

	requiredFieldsRule();
	
	controlePorAtividade();
	formataDatas();
	alteraFormaPagamento();
	
    FLUIGC.calendar('.campo-Data');
	
	if($("#retornoProtheus").val() != ""){
		$("#retornoProtheus").parent().removeClass("fs-display-none");
	}
	
	$(".monetario").mask("#00.000.000.000,00", {reverse: true});
	
	if ($("#a1pessoa").val() == "J"){
		$("#tipoPessoaFJ").val("- Pessoa Jurídica");
		$(".secPessoaFisica").hide();
		$(".secPessoaJuridica").show();
	}
	if ($("#a1pessoa").val() == "F"){
		$("#tipoPessoaFJ").val("- Pessoa Física");
		$(".secPessoaJuridica").hide();
		$(".secPessoaFisica").show();
	}
		
});

function limpaCampos(){
	// Pessoa Física
	$("#nomeCompleto").val("");
	$("#dataNascimento").val("");
	$("#cep").val("");
	$("#numero").val("");
	$("#enderecoExt").val("");
	$("#nifIcamaIdEstrangeiro").val("");
/*	$(".btn-danger").trigger("click");*/
	$("#numeroRg").val("");
	$("#dataVencRg").val("");
	$("#numPassaporte").val("");
	$("#dataVencPassaporte").val("");
	$("#dataInicioCt").val("");
	$("#dataFimCt").val("");
	$("#conjuge").val("");
	$("#dataNascConjuge").val("");
	$("#cpfConjuge").val("");
	$("#iban").val("");
	$("#bancoIdent").val("");
	$("#responsavel").val("");
	$("#spreadAcordado").val("");
	$("#saidaDefinitiva").val("");
	$("#telefoneBrasil").val("");
	$("#telefoneExterior").val("");
	$("#email").val("");

	// Pessoa Jurídica
	$("#razaoSocial").val("");
	$("#dataAbertura").val("");
	$("#socioMarjoritario").val("");
	$("#cpfMarjoritario").val("");
	$("#enderecoSocio").val("");
	$("#cnae").val("");
	
	limpa_formulário_cep();
}

function controlePorAtividade(){
	
	var atividadeAtual = getAtividade();
	
	setTimeout(function() {
		controlaCampos()
	}, 1500);
	
	if(atividadeAtual == 0 || atividadeAtual == 4){
		escondeCampos();
		
		$('input[name="rdClienteNovo"]').change(function() {

			limpaCamposAutomaticos();
		    window['zoomNomeCompleto'].clear();
		    window['zoomcpfCnpj'].clear();			
			
			controlaCampos()
		    requiredFieldsRule();
		});
		
		$(document).on('change', "#cpfCnpj", function (e) {
			
			requiredFieldsRule();
			
		})
		
		var cgc = $("#cpfCnpj").text();
		  
		$("#cpfCnpj").focusout(function() {
			  
			$("#cpfCnpj").unmask();
			var tamanho = $("#cpfCnpj").val().replace(/\D/g, '').length;
			
			if(tamanho > 0)
				if (tamanho == 11) {
					$("#cpfCnpj").mask("999.999.999-99");
					$(".secPessoaJuridica").hide();
					$(".secPessoaFisica").show();
					$("#tipoPessoaFJ").val("- Pessoa Física");
					$("#a1pessoa").val("F");
				} else if (tamanho == 14) {
					$(".secPessoaFisica").hide();
					$(".secPessoaJuridica").show();
					$("#tipoPessoaFJ").val("- Pessoa Jurídica");
					$("#a1pessoa").val("J");
	/*				$('#cpfCnpj').attr('readonly', true);*/
				} else{
					FLUIGC.toast({
						title: 'Atenção: ',
						message: 'Digite um CPF ou CNPJ válidos!',
						type: 'warning'
					});
					$("#cpfCnpj").val("");
					$("#tipoPessoaFJ").val("");
					$("#a1pessoa").val("");
					escondeCampos();
				}
			    
		});
		  
		$("#cpfCnpj").focusin(function() {
			$("#cpfCnpj").unmask();
		});
		
		$("#btnLimpar").click(function(){
			$("#cpfCnpj").val("");
			limpaCamposAutomaticos();
			escondeCampos();
			$("#tipoPessoaFJ").val("");
/*			$('#CpfCnpj').attr('readonly', false);*/
		});
		
		$('#formaPagDB').change(function() {
			alteraFormaPagamento();
		});
	}	
}

function escondeCampos(){
	$("#tipoPessoaFJ").val("");
	$(".secPessoaFisica").hide();
	$(".secPessoaJuridica").hide();
}

function formataDatas(){
	var dataNascimento = FLUIGC.calendar('#dataNascimento');
	var dataAbertura = FLUIGC.calendar('#dataAbertura');
	var dataNascConjuge = FLUIGC.calendar('#dataNascConjuge');
	var dataVencRg = FLUIGC.calendar('#dataVencRg');
	var dataVencPassaporte = FLUIGC.calendar('#dataVencPassaporte');
	var dataInicioCt = FLUIGC.calendar('#dataInicioCt');
	var dataFimCt = FLUIGC.calendar('#dataFimCt');
}

function alteraFormaPagamento(){
	if ($('#formaPagDB').val() == 'S') {
    	$('#divTipoChave').show();
    	$('#divChavePix').show();
    } else {
    	$('#divTipoChave').hide();
    	$('#divChavePix').hide();
    }
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
    	//Atualiza os campos com os valores.
        $("#rua").val(conteudo.logradouro);
        $("#bairro").val(conteudo.bairro);
/*        $("#municip").val(conteudo.localidade);*/
/*	    window['municip'].setValue(conteudo.localidade);
	    window['uf'].setValue(conteudo.uf);*/
    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
		FLUIGC.toast({
			title: 'Atenção: ',
			message: 'CEP não encontrado.',
			type: 'warning'
		});
		$("#cep").val("");

    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            var script = document.createElement('script');
            window.meu_callback = meu_callback; // Definindo a função meu_callback globalmente
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            limpa_formulário_cep();
            FLUIGC.toast({
                title: 'Atenção: ',
                message: 'Formato de CEP inválido!',
                type: 'warning'
            });
            $("#cep").val("");
        }
    } else {
        limpa_formulário_cep();
    }
};


function validacaoEmail(field) {
	usuario = field.value.substring(0, field.value.indexOf("@"));
	dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
	if ((usuario.length >=1) &&
		(dominio.length >=3) &&
		(usuario.search("@")==-1) &&
		(dominio.search("@")==-1) &&
		(usuario.search(" ")==-1) &&
		(dominio.search(" ")==-1) &&
		(dominio.search(".")!=-1) &&
		(dominio.indexOf(".") >=1)&&
		(dominio.lastIndexOf(".") < dominio.length - 1)) {
			$(".validaErro").removeClass("has-error");
			$(".validaErro").addClass("has-success");
			$(".classMsgemail").css("display", "none");
			$(".classMsgemail").html.remove;
	} else if(field.value == ""){
		$(".validaErro").removeClass("has-error");
		$(".validaErro").removeClass("has-success");
		$(".classMsgemail").css("display", "none");
		$(".classMsgemail").html.remove;
	}
	else{
		limparClasse();
	}
}

function limparClasse(){
	$(".validaErro").removeClass("has-success");
	$(".validaErro").addClass("has-error");
	$(".classMsgemail").css("display", "block");
	$(".classMsgemail").html("<font color='red'>E-mail inválido!</font>");
}

function addLinhaTbBanco() {
	// Adicionar filho
	var row = wdkAddChild('dadositensBancarios')
	$("#idBanco___" + row).val(row);
	$("#agencia___" + row).mask("0000");
	$("#digitoAgencia___" + row).mask("0");
	$("#conta___" + row).mask("00000000");
	
}

$(document).on('keyup','.caixa_alta',function(e){
    $(this).val($(this).val().toUpperCase());
});

function verificaCPFCNPJ(){
	
	if($("input[name='rdClienteNovo']:checked").val() != undefined){
		
		if($("input[name='rdClienteNovo']:checked").val() == "sim"){
			
			if($("#cpfCnpj").val()){
				return retiraCaracteresCPFCNPJ($("#cpfCnpj").val());
			}else{
				return "";
			}
			
			
			
		}else{
			
			if($("#zoomcpfCnpj").val()){
				return retiraCaracteresCPFCNPJ($("#zoomcpfCnpj").val()[0]);	
			}else{
				return "";
			}
			
			
		}		
		
	}

	
}

function retiraCaracteresCPFCNPJ(cpfCNPJ){
	
	if(cpfCNPJ != undefined){

		cpfCNPJ = cpfCNPJ.replace(/\D/g, '');
		
		return cpfCNPJ.length;
		
	}else{
		return "";
	}

	
}

function controlaCampos(){
	

	$(".clienteNovo").hide();
	$(".clienteJahCadastrado").hide();
    var verificaClienteNovo = $('input[name="rdClienteNovo"]:checked').val();
    if (verificaClienteNovo == "sim") {
    	$(".clienteNovo").show();
    } else if (verificaClienteNovo == "nao") {
    	$(".clienteJahCadastrado").show(); 
    } else {
    	$(".clienteNovo").hide();
    	$(".clienteJahCadastrado").hide(); 
    }
	
}