function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
	var MOBILE = form.getMobile();
	var MODE = form.getFormMode()
	var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	var customJS = "<script>";
	
	if(MODE == "ADD" && ATIVIDADE == 4){
		form.setValue("nameUserCreation", usuarioCorrente.getCode());
		form.setValue("nomeSolicitante", usuarioCorrente.getFullName());
		form.setValue("emailSolicitante", usuarioCorrente.getEmail());
	    form.setValue("creationDate", retornaData());
		
		/**
		 * Os campos que armazenam as descrições dos anexos, deverão ter seus valores setados no modo ADD caso estejam bloqueados pelo enableFields em ADD.
		 * Caso contrário, terão seus valores zerados e as funções para anexos não funcionarão como esperado.
	     * Isso não se aplica as tabelas pai e filho, pois a descrição do anexo é gravada no campo mo momento em que é adicionada uam nova linha
		 */  
	
/*		form.setValue("fdRegistroNascimento", "Registro Nascimento");
		form.setValue("fdCpf", "CPF");
		form.setValue("fdFoto", "Foto");
		form.setValue("fdComprovante", "Comprovante");*/
	}
	
	customJS += "function getAtividade(){ return '" + ATIVIDADE + "'};";
	customJS += "function getMode(){ return '" + MODE + "'};";
	customJS += "function getMobile(){ return " + MOBILE + "};";
	customJS += "displayBtnFiles();";
	customJS += "var CURRENT_STATE = " + ATIVIDADE + ";";
	customJS += "</script>"
	customHTML.append(customJS)
	
 }

function retornaData(){
	// Buscar a data e hora atual
	var data   = new Date();
	var dia    = data.getDate();
	var mes    = data.getMonth() + 1;
	var ano    = data.getFullYear();
	var hora   = data.getHours();
	var min    = data.getMinutes();
	var seg    = data.getSeconds();

	if(dia < 10) {dia = "0" + dia;}
	if(mes < 10) {mes = "0" + mes;}
	if(hora < 10){hora = "0" + hora;}
	if(min < 10) {min = "0" + min;}
	if(seg < 10) {seg = "0" + seg;}

	return dataInclusaoCompleta = dia + '/' + mes + '/' + ano;	
}