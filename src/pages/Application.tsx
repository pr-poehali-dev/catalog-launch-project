import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Application = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productType: '',
    fullName: '',
    phone: '',
    email: '',
    amount: '',
    income: '',
    employment: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">FinMarket</h1>
            </div>
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 gradient-purple-pink text-white border-0">Онлайн заявка</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Оформите <span className="text-gradient">заявку</span> за 3 минуты
              </h2>
              <p className="text-muted-foreground">
                Заполните простую форму и получите решение в течение 15 минут
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= num 
                        ? 'gradient-purple-pink text-white shadow-lg scale-110' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`w-20 h-1 mx-2 transition-all ${
                        step > num ? 'gradient-purple-pink' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between max-w-md mx-auto mt-2">
                <span className="text-xs text-muted-foreground w-20 text-center">Продукт</span>
                <span className="text-xs text-muted-foreground w-20 text-center">Данные</span>
                <span className="text-xs text-muted-foreground w-20 text-center">Доход</span>
              </div>
            </div>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>
                  {step === 1 && 'Выберите продукт'}
                  {step === 2 && 'Личные данные'}
                  {step === 3 && 'Финансовая информация'}
                </CardTitle>
                <CardDescription>
                  Шаг {step} из 3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="productType">Тип продукта *</Label>
                        <Select 
                          value={formData.productType} 
                          onValueChange={(value) => updateFormData('productType', value)}
                          required
                        >
                          <SelectTrigger id="productType" className="mt-2">
                            <SelectValue placeholder="Выберите продукт" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debit">Дебетовая карта</SelectItem>
                            <SelectItem value="credit">Кредитная карта</SelectItem>
                            <SelectItem value="loan">Потребительский кредит</SelectItem>
                            <SelectItem value="microloan">Микрозайм</SelectItem>
                            <SelectItem value="mortgage">Ипотека</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.productType && (
                        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-primary/20">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-xl gradient-purple-pink flex items-center justify-center flex-shrink-0">
                                <Icon name="Info" className="text-white" size={20} />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">Быстрое одобрение</h4>
                                <p className="text-sm text-muted-foreground">
                                  Большинство заявок одобряются в течение 15 минут
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">ФИО *</Label>
                        <Input
                          id="fullName"
                          placeholder="Иванов Иван Иванович"
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Номер телефона *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@mail.ru"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">Желаемая сумма *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="100000"
                          value={formData.amount}
                          onChange={(e) => updateFormData('amount', e.target.value)}
                          required
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">В рублях</p>
                      </div>

                      <div>
                        <Label htmlFor="income">Ежемесячный доход *</Label>
                        <Input
                          id="income"
                          type="number"
                          placeholder="50000"
                          value={formData.income}
                          onChange={(e) => updateFormData('income', e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="employment">Занятость *</Label>
                        <Select 
                          value={formData.employment} 
                          onValueChange={(value) => updateFormData('employment', value)}
                          required
                        >
                          <SelectTrigger id="employment" className="mt-2">
                            <SelectValue placeholder="Выберите тип занятости" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fulltime">Постоянная работа</SelectItem>
                            <SelectItem value="parttime">Частичная занятость</SelectItem>
                            <SelectItem value="selfemployed">Самозанятый</SelectItem>
                            <SelectItem value="business">Свой бизнес</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-start gap-3 pt-4">
                        <Checkbox 
                          id="terms" 
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => updateFormData('agreeTerms', checked as boolean)}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                          Я согласен с <a href="#" className="text-primary hover:underline">условиями обработки</a> персональных данных и <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                        </Label>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(step - 1)}
                        className="flex-1"
                      >
                        <Icon name="ArrowLeft" className="mr-2" size={16} />
                        Назад
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className="flex-1 gradient-purple-pink text-white"
                    >
                      {step < 3 ? 'Продолжить' : 'Отправить заявку'}
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Icon name="Shield" className="mx-auto mb-2 text-primary" size={28} />
                  <h4 className="font-semibold mb-1 text-sm">Безопасно</h4>
                  <p className="text-xs text-muted-foreground">256-bit шифрование</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Icon name="Zap" className="mx-auto mb-2 text-primary" size={28} />
                  <h4 className="font-semibold mb-1 text-sm">Быстро</h4>
                  <p className="text-xs text-muted-foreground">Ответ за 15 минут</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Icon name="CheckCircle2" className="mx-auto mb-2 text-primary" size={28} />
                  <h4 className="font-semibold mb-1 text-sm">Надёжно</h4>
                  <p className="text-xs text-muted-foreground">Проверенные банки</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Application;
