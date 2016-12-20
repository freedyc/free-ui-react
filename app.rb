require "rack"
require "sinatra"
require "sinatra/contrib"
require "json"


class App < Sinatra::Base

    use Rack::Session::Pool

    configure do
        register Sinatra::Reloader
        set :views, settings.root + '/views'
        set :public_folder, settings.root + '/public'
    end

    before do
        # check_login
    end

    get "/" do
        erb :index
    end

    get "/login" do
        erb :login
    end

    post "/login" do
        session[:role] = {
            :username => params[:username],
            :passwd => params[:passwd]
        }
        session[:role].to_json
    end

    get "/domain_list" do
        erb :domain_list
    end

    get "/domain_list/:domain_name/domain_records" do
        erb :domain_records
    end

    get "/domain_search" do
        erb :domain_search
    end

    get "/domain_search/:domain/domain_sign_up" do
        erb :domain_sign_up
    end

    get "/register_log" do
        erb :register_log
    end

    get "/system_log" do
        erb :system_log
    end

    def check_login
        return if request.path_info == "/login"
        redirect "/login" if session[:role].nil?
    end

end
