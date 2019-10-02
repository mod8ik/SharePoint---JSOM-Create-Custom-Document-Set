function createDocumentSet(name, libraryName, CTid) {


  var clientContext = new SP.ClientContext.get_current();
  var oWebsite = clientContext.get_web();
  var oList = oWebsite.get_lists().getByTitle(libraryName);

  var itemCreateInfo = new SP.ListItemCreationInformation();
  itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
  itemCreateInfo.set_leafName(name);

  this.oListItem = oList.addItem(itemCreateInfo);
  this.oListItem.set_item('ContentTypeId', CTid);
  this.oListItem.update();

  clientContext.load(this.oListItem);
  clientContext.executeQueryAsync(
    Function.createDelegate(this, successHandler),
    Function.createDelegate(this, errorHandler)
  );
}

function successHandler() {
  console.log("done")
}

function errorHandler(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
} 
