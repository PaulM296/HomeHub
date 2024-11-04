namespace HomeHub.Infrastructure.Exceptions
{
    public class UserAlreadyExistsException : Exception
    {
        private const string MessageTemplate = "The User with email {0} already exists.";

        public UserAlreadyExistsException()
            : base() { }

        public UserAlreadyExistsException(string email)
            : base(string.Format(MessageTemplate, email)) { }

        public UserAlreadyExistsException(string email, Exception innerException)
            : base(string.Format(MessageTemplate, email), innerException) { }
    }
}
