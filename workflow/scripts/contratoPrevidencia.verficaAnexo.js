function verficaAnexo(){
	
		var constraints = [];
		constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST));
		var processHistory = DatasetFactory.getDataset("processHistory", null, constraints, null);

		var constraints = [];
		constraints.push(DatasetFactory.createConstraint("processAttachmentPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence", 1, 1, ConstraintType.MUST_NOT));
		//constraints.push(DatasetFactory.createConstraint("originalMovementSequence", processHistory.getValue(0, "processHistoryPK.movementSequence"), processHistory.getValue(0, "processHistoryPK.movementSequence"), ConstraintType.MUST));
		var attachment = DatasetFactory.getDataset("processAttachment", null, constraints, null);
		log.info("### attachment.rowsCount: "+attachment.rowsCount);
		return attachment.rowsCount;

}