namespace HomeHub.App.Exceptions
{
    public class StorageNotFoundException : Exception
    {
        private const string MessageTemplate = "The Storage with name {0} was not found.";

        public StorageNotFoundException()
            : base() { }

        public StorageNotFoundException(string entityName)
            : base(string.Format(MessageTemplate, entityName)) { }

        public StorageNotFoundException(string entityName, Exception innerException)
            : base(string.Format(MessageTemplate, entityName), innerException) { }
    }
}
