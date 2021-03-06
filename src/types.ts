export enum TOKEN_TYPE {
    // punctuators
    L_PAREN,
    R_PAREN,
    L_BRACE,
    R_BRACE,
    L_BRACKET,
    R_BRACKET,
    DOT,
    THREE_DOTS,
    SEMICOLON,
    COMMA,
    L_ANGLE,
    R_ANGLE,
    LESS_THAN_OR_EQ,
    GREATER_THAN_OR_EQ,
    EQUAL,
    NOT_EQ,
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
    REMAINDER,
    POWER,
    INCREMENT,
    DECREMENT,
    L_SHIFT,
    R_SHIFT,
    U_SHIFT,
    BITWISE_AND, 
    BITWISE_OR,
    BITWISE_XOR,
    NOT,
    BITWISE_NOT,
    AND,
    OR,
    QUESTION,
    COLON,
    ASSIGN,
    PLUS_ASSIGN,
    MINUS_ASSIGN,
    MULTIPLY_ASSIGN,
    REMAINDER_ASSIGN,
    DIVIDE_ASSIGN,
    POWER_ASSIGN,
    L_SHIFT_ASSIGN,
    R_SHIFT_ASSIGN,
    U_SHIFT_ASSIGN,
    BITWISE_AND_ASSIGN,
    BITWISE_OR_ASSIGN,
    BITWISE_XOR_ASSIGN,
    AND_ASSIGN,
    OR_ASSIGN,
    ARROW,

    // KEYWORDS
    AWAIT,
    BREAK,
    CASE,
    CATCH,
    CLASS,
    CONST,
    CONTINUE,
    DEBUGGER,
    DEFAULT,
    DELETE,
    DO,
    ELSE,
    ENUM,
    EXPORT,
    EXTENDS,
    FALSE,
    FINALLY,
    FOR,
    FUNCTION,
    IF,
    IMPORT,
    IN,
    INSTANCEOF,
    NEW,
    NULL,
    RETURN,
    SUPER,
    SWITCH,
    THIS,
    THROW,
    TRUE,
    TRY,
    TYPEOF,
    VAR,
    VOID,
    WHILE,
    WITH,
    YIELD,
    LET,
    STATIC,
    IMPLEMENT,
    INTERFACE,
    PACKAGE,
    PRIVATE,
    PROTECTED,
    PUBLIC,
    AS,
    ASYNC,
    FROM,
    GET,
    OF,
    SET,
    TARGET,
    IDENTIFIER,
};
export interface TOKEN {
    type: TOKEN_TYPE;
    id: string;
};
