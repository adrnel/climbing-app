describe('login page', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000/#!/');
    });
    it('should give an error message when you login with the wrong credentials', function() {
        element(by.model('username')).sendKeys('wrong');
        element(by.model('password')).sendKeys('password');
        var loginError = element(by.css('.error-section'));
        element(by.css('[value="Login"]')).click();
        expect(loginError.getText()).toEqual('Incorrect username and/or password');
    });
});