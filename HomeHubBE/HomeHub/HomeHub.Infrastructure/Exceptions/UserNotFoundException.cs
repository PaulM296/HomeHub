namespace HomeHub.Infrastructure.Exceptions
{
    public class UserNotFoundException : Exception
    {
        private const string MessageTemplate = "The User with email {0} was not found.";

        public UserNotFoundException()
            : base() { }

        public UserNotFoundException(string email)
            : base(string.Format(MessageTemplate, email)) { }

        public UserNotFoundException(string email, Exception innerException)
            : base(string.Format(MessageTemplate, email), innerException) { }
    }
}
