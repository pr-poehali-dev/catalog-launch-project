import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  type: 'debit' | 'credit' | 'loan' | 'microloan' | 'subscription';
  rate: number;
  bank: string;
  description: string;
  features: string[];
  badge?: string;
  fullDescription?: string;
  requirements?: string[];
  documents?: string[];
  benefits?: string[];
}

const productsData: Record<string, Product> = {
  '1': {
    id: 1,
    title: 'Дебетовая карта Премиум',
    type: 'debit',
    rate: 7.5,
    bank: 'Альфа-Банк',
    description: 'Карта с высоким кэшбэком и бесплатным обслуживанием',
    features: ['До 7.5% на остаток', 'Кэшбэк 5%', 'Бесплатное обслуживание', 'Снятие без комиссии'],
    badge: 'Популярное',
    fullDescription: 'Дебетовая карта Премиум от Альфа-Банка — это современное решение для тех, кто ценит выгоду и удобство. Получайте высокий процент на остаток и щедрый кэшбэк за покупки.',
    requirements: ['Возраст от 18 лет', 'Гражданство РФ', 'Наличие мобильного телефона'],
    documents: ['Паспорт РФ'],
    benefits: ['Бесплатное обслуживание навсегда', 'Снятие наличных без комиссии в любых банкоматах', 'Защита от мошенничества 24/7', 'Мгновенные уведомления о операциях']
  },
  '2': {
    id: 2,
    title: 'Кредитная карта Gold',
    type: 'credit',
    rate: 19.9,
    bank: 'Тинькофф',
    description: 'Кредитная карта с длинным льготным периодом',
    features: ['120 дней без %', 'Лимит до 500 000 ₽', 'Кэшбэк 3%', 'Бесплатная доставка'],
    badge: 'Выгодно',
    fullDescription: 'Кредитная карта Gold — это 120 дней без процентов на покупки и снятие наличных. Пользуйтесь деньгами банка бесплатно и получайте кэшбэк.',
    requirements: ['Возраст от 18 до 70 лет', 'Гражданство РФ', 'Официальный доход'],
    documents: ['Паспорт РФ', 'Справка 2-НДФЛ или по форме банка'],
    benefits: ['Льготный период 120 дней', 'Кэшбэк до 30% у партнёров', 'Бесплатное снятие до 50 000 ₽/мес', 'Рассрочка на 12 месяцев']
  },
  '3': {
    id: 3,
    title: 'Потребительский кредит',
    type: 'loan',
    rate: 12.5,
    bank: 'Сбербанк',
    description: 'Кредит наличными на любые цели',
    features: ['До 3 000 000 ₽', 'Срок до 7 лет', 'Без справок', 'Быстрое одобрение'],
    fullDescription: 'Потребительский кредит от Сбербанка — деньги на любые цели под выгодный процент. Быстрое решение и удобные условия погашения.',
    requirements: ['Возраст от 21 до 65 лет', 'Стаж на последнем месте работы от 3 месяцев', 'Гражданство РФ'],
    documents: ['Паспорт РФ', 'Справка о доходах (для клиентов банка не требуется)'],
    benefits: ['Одобрение за 2 минуты онлайн', 'Деньги на карту сразу', 'Досрочное погашение без комиссии', 'Возможность рефинансирования']
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? productsData[id] : null;

  const [loanAmount, setLoanAmount] = useState([300000]);
  const [loanTerm, setLoanTerm] = useState([24]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Продукт не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const monthlyPayment = product.type === 'loan' 
    ? Math.round((loanAmount[0] * (product.rate / 100 / 12)) / (1 - Math.pow(1 + (product.rate / 100 / 12), -loanTerm[0])))
    : 0;

  const totalPayment = monthlyPayment * loanTerm[0];
  const overpayment = totalPayment - loanAmount[0];

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
              Назад к каталогу
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl gradient-purple-pink flex items-center justify-center">
                          <Icon name="CreditCard" className="text-white" size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-3xl mb-2">{product.title}</CardTitle>
                          <CardDescription className="text-base">{product.bank}</CardDescription>
                        </div>
                      </div>
                      {product.badge && (
                        <Badge className="gradient-blue-purple text-white border-0">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{product.fullDescription}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-5xl font-bold text-gradient">{product.rate}%</span>
                      <span className="text-lg text-muted-foreground">
                        {product.type === 'subscription' ? 'в месяц' : product.type === 'debit' ? 'на остаток' : 'годовых'}
                      </span>
                    </div>

                    <Tabs defaultValue="features" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="features">Особенности</TabsTrigger>
                        <TabsTrigger value="requirements">Требования</TabsTrigger>
                        <TabsTrigger value="documents">Документы</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="features" className="space-y-4 pt-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="Sparkles" size={18} className="text-primary" />
                          Ключевые преимущества
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {product.benefits?.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                              <Icon name="Check" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="requirements" className="space-y-4 pt-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="FileCheck" size={18} className="text-primary" />
                          Требования к заёмщику
                        </h3>
                        <ul className="space-y-2">
                          {product.requirements?.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="CircleDot" size={16} className="text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      
                      <TabsContent value="documents" className="space-y-4 pt-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Icon name="FileText" size={18} className="text-primary" />
                          Необходимые документы
                        </h3>
                        <ul className="space-y-2">
                          {product.documents?.map((doc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="File" size={16} className="text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {product.type === 'loan' && (
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Calculator" size={20} />
                        Калькулятор платежей
                      </CardTitle>
                      <CardDescription>
                        Рассчитайте ежемесячный платёж и переплату
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Сумма кредита: {loanAmount[0].toLocaleString('ru-RU')} ₽</Label>
                        <Slider
                          value={loanAmount}
                          onValueChange={setLoanAmount}
                          min={50000}
                          max={3000000}
                          step={50000}
                          className="mt-3"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>50 000 ₽</span>
                          <span>3 000 000 ₽</span>
                        </div>
                      </div>

                      <div>
                        <Label>Срок кредита: {loanTerm[0]} мес ({Math.round(loanTerm[0] / 12 * 10) / 10} лет)</Label>
                        <Slider
                          value={loanTerm}
                          onValueChange={setLoanTerm}
                          min={6}
                          max={84}
                          step={6}
                          className="mt-3"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>6 мес</span>
                          <span>84 мес (7 лет)</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                          <div className="text-2xl font-bold text-gradient mb-1">
                            {monthlyPayment.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">Ежемесячный платёж</div>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold mb-1">
                            {totalPayment.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">Общая сумма</div>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold mb-1">
                            {overpayment.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">Переплата</div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Input 
                          type="number" 
                          placeholder="Введите сумму вручную"
                          onChange={(e) => setLoanAmount([parseInt(e.target.value) || 300000])}
                          className="text-center"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {product.type === 'credit' && (
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Calculator" size={20} />
                        Калькулятор кредитной карты
                      </CardTitle>
                      <CardDescription>
                        Рассчитайте выгоду от льготного периода
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Сумма покупки: {loanAmount[0].toLocaleString('ru-RU')} ₽</Label>
                        <Slider
                          value={loanAmount}
                          onValueChange={setLoanAmount}
                          min={10000}
                          max={500000}
                          step={10000}
                          className="mt-3"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                          <div className="text-2xl font-bold text-green-600 mb-1">0 ₽</div>
                          <div className="text-xs text-muted-foreground">С льготным периодом</div>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50">
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            {Math.round(loanAmount[0] * (product.rate / 100) * (120 / 365)).toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">Без льготного периода</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-center">
                          <Icon name="Info" size={16} className="inline mr-1" />
                          Экономия при использовании льготного периода: 
                          <span className="font-bold text-primary ml-1">
                            {Math.round(loanAmount[0] * (product.rate / 100) * (120 / 365)).toLocaleString('ru-RU')} ₽
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Оформить заявку</CardTitle>
                    <CardDescription>Решение за 2 минуты</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full gradient-purple-pink text-white" 
                      size="lg"
                      onClick={() => navigate('/application')}
                    >
                      <Icon name="FileText" className="mr-2" size={18} />
                      Подать заявку
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/compare')}
                    >
                      <Icon name="ArrowLeftRight" className="mr-2" size={18} />
                      Сравнить с другими
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/reviews')}
                    >
                      <Icon name="MessageSquare" className="mr-2" size={18} />
                      Отзывы клиентов
                    </Button>

                    <div className="pt-4 space-y-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span>Решение за 2 минуты</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Shield" size={16} className="text-primary" />
                        <span>Безопасная передача данных</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="CheckCircle2" size={16} className="text-primary" />
                        <span>Без скрытых комиссий</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Похожие продукты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.values(productsData)
                      .filter(p => p.id !== product.id && p.type === product.type)
                      .slice(0, 2)
                      .map(p => (
                        <div 
                          key={p.id}
                          className="p-3 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                          onClick={() => navigate(`/product/${p.id}`)}
                        >
                          <div className="font-semibold text-sm mb-1">{p.title}</div>
                          <div className="text-xs text-muted-foreground mb-2">{p.bank}</div>
                          <div className="text-primary font-bold">{p.rate}%</div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;