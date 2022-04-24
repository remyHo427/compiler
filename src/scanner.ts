import { TOKEN, TOKEN_TYPE } from "./types";

let prg: string;
let skip: boolean;
let toks: TOKEN[] = [];
let char_index: number;
let tok_count = 0;

const scan = (str: string) => {
    prg = str;
    let len = str.length;
    let c: string;
    char_index = 0;

    while (char_index < len) {
        skip = false;
        c = peek();

        switch (c) {
            case '\t':
                next();
                continue;
            case '\n':
                next();
                continue;
            case '\/':
                if (peek_next() == '\/') {
                    advance_by(2);
                    while (peek() != '\n') {
                        next();
                    }
                    continue;
                } else if (peek_next() == '*') {
                    advance_by(2);
                    while (peek() != '*' || peek_next() != '\/') {
                        next();
                    }
                    advance_by(2);
                    continue;
                }
            case ' ':
                while (peek_next() == ' ')
                    next();
                next();
                continue;
        }

        switch (c) {
            case '(':
                make_token(TOKEN_TYPE.L_PAREN);
                next();
                break;
            case ')':
                make_token(TOKEN_TYPE.R_PAREN);
                next();
                break;
            case '[':
                make_token(TOKEN_TYPE.L_BRACKET);
                next();
                break;
            case ']':
                make_token(TOKEN_TYPE.R_BRACKET);
                next();
                break;
            case '{':
                make_token(TOKEN_TYPE.L_BRACE);
                next();
                break;
            case '}':
                make_token(TOKEN_TYPE.R_BRACE);
                next();
                break;
            case ';':
                make_token(TOKEN_TYPE.SEMICOLON);
                next();
                break;
            case '~':
                make_token(TOKEN_TYPE.BITWISE_NOT);
                next();
                break;
            case '?':
                make_token(TOKEN_TYPE.QUESTION);
                next();
                break;
            case ':':
                make_token(TOKEN_TYPE.COLON);
                next();
                break;
            case '.':
                check("...", TOKEN_TYPE.THREE_DOTS);
                make_token(TOKEN_TYPE.DOT);
                next();
                break;
            case '^':
                check("^=", TOKEN_TYPE.BITWISE_XOR_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_XOR);
                next();
                break;
            case '!':
                check("!=", TOKEN_TYPE.NOT_EQ);
                make_token(TOKEN_TYPE.NOT);
                next();
                break;
            case '&':
                check("&&=", TOKEN_TYPE.AND_ASSIGN);
                check("&&", TOKEN_TYPE.AND);
                check("&=", TOKEN_TYPE.BITWISE_AND_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_AND);
                next();
                break;
            case '|':
                check("||=", TOKEN_TYPE.OR_ASSIGN);
                check("||", TOKEN_TYPE.OR);
                check("|=", TOKEN_TYPE.BITWISE_OR_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_OR);
                next();
                break;
            case '=':
                check("=>", TOKEN_TYPE.ARROW);
                check("==", TOKEN_TYPE.EQUAL);
                make_token(TOKEN_TYPE.ASSIGN);
                next();
                break;
            case '+':
                check("++", TOKEN_TYPE.INCREMENT);
                check("+=", TOKEN_TYPE.PLUS_ASSIGN);
                make_token(TOKEN_TYPE.PLUS);
                next();
                break;
            case '-':
                check("--", TOKEN_TYPE.DECREMENT);
                check("-=", TOKEN_TYPE.MINUS_ASSIGN);
                make_token(TOKEN_TYPE.MINUS);
                next();
                break;
            case '*':
                check("*=", TOKEN_TYPE.MULTIPLY_ASSIGN);
                check("**=", TOKEN_TYPE.POWER_ASSIGN);
                check("**", TOKEN_TYPE.POWER);
                make_token(TOKEN_TYPE.MULTIPLY);
                next();
                break;
            case '/':
                check("/=", TOKEN_TYPE.DIVIDE_ASSIGN);
                make_token(TOKEN_TYPE.DIVIDE);
                next();
                break;
            case '%':
                check("%=", TOKEN_TYPE.REMAINDER_ASSIGN);
                make_token(TOKEN_TYPE.REMAINDER);
                next();
                break;
            case '<':
                check("<<=", TOKEN_TYPE.L_SHIFT_ASSIGN);
                check("<<", TOKEN_TYPE.L_SHIFT);
                check("<=", TOKEN_TYPE.LESS_THAN_OR_EQ);
                make_token(TOKEN_TYPE.L_ANGLE);
                next();
                break;
            case '>':
                check(">>>=", TOKEN_TYPE.U_SHIFT_ASSIGN);
                check(">>>", TOKEN_TYPE.U_SHIFT);
                check(">>=", TOKEN_TYPE.R_SHIFT_ASSIGN);
                check(">>", TOKEN_TYPE.R_SHIFT);
                check(">=", TOKEN_TYPE.GREATER_THAN_OR_EQ);
                make_token(TOKEN_TYPE.R_ANGLE);
                next();
                break;
        }

        if (skip) {
            continue;
        }

        switch (c) {
            case 'a':
                check_keyword("as", TOKEN_TYPE.AS);
                check_keyword("async", TOKEN_TYPE.ASYNC);
                check_keyword("await", TOKEN_TYPE.AWAIT);
                identifier();
                break;
            case 'b':
                check_keyword("break", TOKEN_TYPE.BREAK);
                identifier();
                break;
            case 'c':
                check_keyword("case", TOKEN_TYPE.CASE);
                check_keyword("catch", TOKEN_TYPE.CATCH);
                check_keyword("class", TOKEN_TYPE.CLASS);
                check_keyword("const", TOKEN_TYPE.CONST);
                check_keyword("continue", TOKEN_TYPE.CONTINUE);
                identifier();
                break;
            case 'd':
                check_keyword("do", TOKEN_TYPE.DO);
                check_keyword("delete", TOKEN_TYPE.DELETE);
                check_keyword("default", TOKEN_TYPE.DEFAULT);
                check_keyword("debugger", TOKEN_TYPE.DEBUGGER);
                identifier();
                break;
            case 'e':
                check_keyword("else", TOKEN_TYPE.ELSE);
                check_keyword("enum", TOKEN_TYPE.ENUM);
                check_keyword("export", TOKEN_TYPE.EXPORT);
                check_keyword("extends", TOKEN_TYPE.EXTENDS);
                identifier();
                break;
            case 'f':
                check_keyword("for", TOKEN_TYPE.FOR);
                check_keyword("from", TOKEN_TYPE.FROM);
                check_keyword("finally", TOKEN_TYPE.FINALLY);
                check_keyword("function", TOKEN_TYPE.FUNCTION);
                identifier();
                break;
            case 'g':
                check_keyword("get", TOKEN_TYPE.GET);
                identifier();
                break;
            case 'i':
                check_keyword("if", TOKEN_TYPE.IF);
                check_keyword("in", TOKEN_TYPE.IN);
                check_keyword("import", TOKEN_TYPE.IMPORT);
                check_keyword("instanceof", TOKEN_TYPE.INSTANCEOF);
                identifier();
                break;
            case 'l':
                check_keyword("let", TOKEN_TYPE.LET);
                identifier();
                break;
            case 'n':
                check_keyword("new", TOKEN_TYPE.NEW);
                check_keyword("null", TOKEN_TYPE.NULL);
                identifier();
                break;
            case 'o':
                check_keyword("of", TOKEN_TYPE.OF);
                identifier();
                break;
            case 'r':
                check_keyword("return", TOKEN_TYPE.RETURN);
                identifier();
                break;
            case 's':
                check_keyword("set", TOKEN_TYPE.SET);
                check_keyword("super", TOKEN_TYPE.NULL);
                check_keyword("switch", TOKEN_TYPE.SWITCH);
                identifier();
                break;
            case 't':
                check_keyword("try", TOKEN_TYPE.TRY);
                check_keyword("true", TOKEN_TYPE.TRUE);
                check_keyword("this", TOKEN_TYPE.THIS);
                check_keyword("throw", TOKEN_TYPE.THROW);
                check_keyword("target", TOKEN_TYPE.TARGET);
                check_keyword("typeof", TOKEN_TYPE.TYPEOF);
                identifier();
                break;
            case 'v':
                check_keyword("var", TOKEN_TYPE.VAR);
                check_keyword("void", TOKEN_TYPE.VOID);
                identifier();
                break;
            case 'w':
                check_keyword("with", TOKEN_TYPE.WITH);
                check_keyword("while", TOKEN_TYPE.WHILE);
                identifier();
                break;
            case 'y':
                check_keyword("yield", TOKEN_TYPE.YIELD);
                identifier();
                break;
            case '_':
                identifier();
                break;
            case '$':
                identifier();
                break;
            default:
                if (!skip && isalpha(c)) {
                    identifier();
                }
        }

        if (skip) {
            continue;
        }

        next();
    }

    return toks;
}

const make_token = (type: TOKEN_TYPE, id = "") => {
    if (!skip) {
        toks[tok_count++] = { type, id };
        skip = true;
    }
}

const check = (comp_str: string, type: TOKEN_TYPE) => {
    let k = 0;
    let j = char_index;
    let len = comp_str.length;
    let c: string;

    while ((c = prg[j]) && comp_str[k] == prg[j]) {
        k++;
        j++;
    }

    if (k == len) {
        make_token(type);
        advance_by(k);
    }
}

const check_keyword = (comp_str: string, type: TOKEN_TYPE) => {
    let k = 0;
    let j = char_index;
    let c: string;

    while (isalpha(c = prg[j])) {
        j++;
        if (c == comp_str[k]) {
            k++;
            continue;
        } else {
            break;
        }
    }

    if (prg[j - k] == comp_str[0]) {
        make_token(type);
        advance_by(k);
    }
}

const identifier = () => {
    let c: string;
    let str = "";
    
    while (1) {
        c = peek();
        if (c == '_' || c == '$' || isnumber(c) || isalpha(c)) {
            str += c;
            next();
        } else {
            break;
        }
    }

    make_token(TOKEN_TYPE.IDENTIFIER, str);
}

const peek = () => prg[char_index];
const peek_next = () => prg[char_index + 1];
const next = () => char_index++;
const advance_by = (i: number) => char_index += i;

// only tested for UTF-8
const isalpha = (c: string) => (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
const isnumber = (c: string) => (c >= '0') && (c <= '9');

export default scan;