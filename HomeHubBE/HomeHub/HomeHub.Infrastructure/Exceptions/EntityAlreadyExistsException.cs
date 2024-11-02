namespace HomeHub.Infrastructure.Exceptions
{
    public class EntityAlreadyExistsException : Exception
    {
        private const string MessageTemplate = "The {0} with id {1} already exists.";
        private const string MessageTemplate2 = "The {0} with name {1} already exists.";

        public EntityAlreadyExistsException()
            : base() { }

        public EntityAlreadyExistsException(string entityType, Guid entityId)
            : base(string.Format(MessageTemplate, entityType, entityId)) { }

        public EntityAlreadyExistsException(string entityType, Guid entityId, Exception innerException)
            : base(string.Format(MessageTemplate, entityType, entityId), innerException) { }

        public EntityAlreadyExistsException(string entityType, string entityName)
            : base(string.Format(MessageTemplate2, entityType, entityName)) { }

        public EntityAlreadyExistsException(string entityType, string entityName, Exception innerException)
            : base(string.Format(MessageTemplate2, entityType, entityName), innerException) { }
    }
}
